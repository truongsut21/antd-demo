import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Biến để tránh các yêu cầu refresh token song song
let isRefreshing = false; // Đánh dấu trạng thái làm mới token
let failedQueue: any[] = []; // Hàng đợi các yêu cầu bị thất bại trong khi làm mới token

const processQueue = (error: any, token: string | null = null) => {
  // Xử lý hàng đợi các yêu cầu bị thất bại
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token); // Giải quyết các yêu cầu với token mới
    } else {
      prom.reject(error); // Từ chối các yêu cầu nếu không thể làm mới token
    }
  });

  failedQueue = []; // Làm trống hàng đợi sau khi xử lý xong
};

// Thêm interceptor cho các phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  
  async (error) => {
    const originalRequest = error.config; // Lưu trữ yêu cầu ban đầu

    // Kiểm tra nếu lỗi là 401 và chưa thử lại yêu cầu
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang làm mới token, thêm yêu cầu vào hàng đợi
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          // Cập nhật header Authorization với token mới khi token được làm mới
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest); // Thử lại yêu cầu ban đầu
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true; // Đánh dấu rằng yêu cầu này đang được thử lại
      isRefreshing = true; // Đánh dấu rằng hệ thống đang làm mới token

      const refreshToken = localStorage.getItem('refresh_token'); // Lấy refresh token từ localStorage
      return new Promise(function (resolve, reject) {
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/refresh`, { token: refreshToken })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token);
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
            originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
            processQueue(null, data.access_token); // Giải quyết các yêu cầu trong hàng đợi với token mới
            resolve(axiosInstance(originalRequest)); // Thử lại yêu cầu ban đầu
          })
          .catch((err) => {
            processQueue(err, null); // Từ chối các yêu cầu trong hàng đợi nếu làm mới token thất bại
            reject(err);
          })
          .then(() => { isRefreshing = false });
      });
    }

    return Promise.reject(error); // Trả về lỗi nếu không thể làm mới token hoặc lỗi khác không phải 401
  }
);

export default axiosInstance;
