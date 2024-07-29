import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Payload {
  email: string;
}
interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const fetchForgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  Payload
>("fetchForgotPassWord", async (data: Payload, { rejectWithValue }) => {
  try {
    const tokenJWT = localStorage.getItem("access_token");
    const url = `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`;

    const response = await axios.post(url, data, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `${tokenJWT}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
