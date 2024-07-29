import React, { useState } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

const DashBoard: React.FC = () => {
  const navigate = useNavigate();

  const getDataUsetoken = async () => {
    try {
      // const response = await axiosInstance.get("/blabla");
      console.log("response ");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    // Thực hiện hành động đăng xuất (xóa TOKEN, v.v.)
    localStorage.removeItem("access_token"); // Xóa TOKEN khỏi localStorage
    localStorage.removeItem("refresh_token"); // Xóa refresh_token khỏi localStorage

    // Hiển thị thông báo
    message.success("Successfully logged out");

    // Điều hướng người dùng đến trang đăng nhập
    navigate("/login");
  };

  return (
    <>
      <Button type="primary" onClick={handleLogout}>
        Đăng xuất
      </Button>

      <Button type="primary" className="mx-5" onClick={getDataUsetoken}>
        Chuc nang can token
      </Button>
    </>
  );
};

export default DashBoard;
