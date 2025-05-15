import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './authSlice.js';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});