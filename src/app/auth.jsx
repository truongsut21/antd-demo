import axios from "axios";

// Hàm kiểm tra quyền truy cập
const checkAuth = () => {
  // Lấy token từ local storage
  const TOKEN = localStorage.getItem("token");

  // Danh sách các route công khai
  const PUBLIC_ROUTES = [
    "login",
    "forgot-password",
    "register",
    "documentation",
  ];

  // Kiểm tra xem trang hiện tại có phải là trang công khai hay không
  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  // Nếu không có token và không phải trang công khai, chuyển hướng đến trang đăng nhập
  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return;
  } else {
    // Thiết lập header Authorization cho Axios
    axios.defaults.headers.common["Authorization"] = `${TOKEN}`;

    // Interceptor request để hiển thị loading indicator khi gửi yêu cầu
    axios.interceptors.request.use(
      function (config) {
        document.body.classList.add("loading-indicator");
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Interceptor response để ẩn loading indicator khi nhận được phản hồi
    axios.interceptors.response.use(
      function (response) {
        document.body.classList.remove("loading-indicator");
        return response;
      },
      function (error) {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
      }
    );

    // Trả về token
    return TOKEN;
  }
};

// Xuất hàm checkAuth để có thể sử dụng trong các module khác
export default checkAuth;
