import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Payload {
  email: string;
  code: string;
}
// Định nghĩa interface cho response
interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const fetchCheckResetCode = createAsyncThunk<
  ForgotPasswordResponse,
  Payload
>("fetchCheckResetCode", async (data: Payload, { rejectWithValue }) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/check-reset-code`;

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
});
