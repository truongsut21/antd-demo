import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginData {
  email: string;
  password: string;
}

export const FetchLogin = createAsyncThunk(
  "FetchLogin",
  async (data: LoginData, { rejectWithValue }) => {
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
        // Lấy chi tiết lỗi từ response
        const errorDetail = await response.json();
        return rejectWithValue(errorDetail);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
