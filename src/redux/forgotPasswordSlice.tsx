// src/features/forgotPassword/forgotPasswordSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
  email: '',
  code: '',
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload; // Gán giá trị email từ action.payload
    },

    setCode(state, action) {
      state.code = action.payload; // Gán giá trị email từ action.payload
    },
  },
});

export const { setEmail,setCode } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
