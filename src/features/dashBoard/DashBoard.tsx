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
    localStorage.removeItem("access_token"); 
    localStorage.removeItem("refresh_token"); 
    message.success("Successfully logged out");
    navigate("/login");
  };

  const fetchProfileData = async () => {
    try {
      const response = await dispatch(FetchProfile());
      if (response.payload) {
        setProfileData(response.payload); // Lưu trữ dữ liệu vào state
        notification.success({
          message: "success",
          description: "Fetch profile data",
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
    fetchProfileData();
  }, []);

  return (
    <div className="m-10">
      <Button type="primary" onClick={handleLogout}>
        Đăng xuất
      </Button>

      <Button type="primary" className="mx-5" onClick={fetchProfileData}>
        Fetch ProfileData
      </Button>

      <p className="mt-10">ID: {profileData.id}</p> <br />
      <p>Email: {profileData.email}</p> <br />
      <p>Username: {profileData.username}</p> <br />
    </div>
  );
};

export default DashBoard;
