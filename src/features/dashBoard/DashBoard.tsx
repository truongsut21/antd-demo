import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const DashBoard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Thực hiện hành động đăng xuất (xóa TOKEN, v.v.)
    localStorage.removeItem("token"); // Xóa TOKEN khỏi localStorage

    // Hiển thị thông báo
    message.success("Successfully logged out");

    // Điều hướng người dùng đến trang đăng nhập
    navigate("/login");
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default DashBoard;
