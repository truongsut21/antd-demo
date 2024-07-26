// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import forgotPasswordReducer from "./forgotPasswordSlice";

const store = configureStore({
  reducer: {
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
