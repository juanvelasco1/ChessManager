import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/CounterSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});