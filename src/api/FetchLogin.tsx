import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginData {
  email?: string;
  password?: string;
}

export const FetchLogin = createAsyncThunk(
  "FetchLogin",
  async (data: LoginData) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // Xử lý lỗi nếu có
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.log("loi o api login ");
    }
  }
);
