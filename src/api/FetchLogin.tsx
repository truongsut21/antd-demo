import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const FetchLogin = createAsyncThunk(
  "FetchLogin",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/login`;
      const response = await axios.post(url, data, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      // Nếu lỗi từ Axios, nó thường nằm trong `error.response`
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
