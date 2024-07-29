import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface payload {
  email: string;
  password: string;
  code: string;
}

export const fetchResetPassword = createAsyncThunk(
  "fetchResetPassword",
  async (data: payload, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/reset-password`;

      const response = await axios.post(url, data, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
