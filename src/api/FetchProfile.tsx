import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../utils/axiosConfig';

export const FetchProfile = createAsyncThunk(
  "FetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/users/profile`;

      const response = await axiosInstance.get(url, {
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
