import React, { useEffect, useState } from "react";
import { Button, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { FetchProfile } from "../../api/FetchProfile";

const DashBoard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [profileData, setProfileData] = useState<any>("");

  const handleLogout = () => {
    // Thực hiện hành động đăng xuất (xóa TOKEN, v.v.)
    localStorage.removeItem("access_token"); // Xóa TOKEN khỏi localStorage
    localStorage.removeItem("refresh_token"); // Xóa refresh_token khỏi localStorage

    // Hiển thị thông báo
    message.success("Successfully logged out");

    // Điều hướng người dùng đến trang đăng nhập
    navigate("/login");
  };

  const fetchProfileData = async () => {
    try {
      const response = await dispatch(FetchProfile());
      if (response.payload) {
        setProfileData(response.payload); // Lưu trữ dữ liệu vào state
        console.log("response: ", response);
      } else {
        notification.error({
          message: "Error",
          description: "Failed to fetch profile data",
        });
      }
    } catch (error) {
      console.log("error: ", error);
      notification.error({
        message: "Error",
        description: "Error in API FetchProfile",
      });
    }
  };

  useEffect(() => {
    console.log("useEffect");
    fetchProfileData();
  }, []);

  return (
    <>
      <Button type="primary" onClick={handleLogout}>
        Đăng xuất
      </Button>

      <Button type="primary"className="mx-5" onClick={fetchProfileData}>
      fetchProfileData
      </Button>

      <p>{JSON.stringify(profileData)}</p>

      
    </>
  );
};

export default DashBoard;
