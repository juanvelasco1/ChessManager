import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});