// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'
import postReducer from '../features/Post/postSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
