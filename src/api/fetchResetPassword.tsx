import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface payload {
  email: string;
  password: string;
  code: string
}

export const fetchResetPassword = createAsyncThunk(
  "fetchResetPassword",
  async (data: payload) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/reset-password`;

      const response = await axios.post(url, data, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Xử lý lỗi nếu có
    }
  }
);
