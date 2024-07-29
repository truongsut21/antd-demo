import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = async () => {
    const navigate = useNavigate();
  try {
    // Lấy refresh token từ localStorage
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("Refresh token không tồn tại");
    }

    // Gửi yêu cầu để lấy access token mới
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
      { refresh_token: refreshToken }
    );

    // Lưu refresh token và access token mới vào localStorage
    const { refresh_token: newRefreshToken, access_token: newAccessToken } =
      response.data;
    localStorage.setItem("refresh_token", newRefreshToken);
    localStorage.setItem("access_token", newAccessToken);

    return newAccessToken; // Trả về access token mới
  } catch (error) {
    console.error("Lỗi khi lấy refresh token:", error);

    // Xóa các token cũ và chuyển hướng đến trang đăng nhập
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

     navigate('/home');
  }
};

export default Auth;
