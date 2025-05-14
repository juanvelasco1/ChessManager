import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  nickname: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload;
      localStorage.setItem("uid", action.payload);
    },

    login: (state, action) => {
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.uid = null;
    },
  },
});

export const { login, logout, setUser } = AuthSlice.actions;
export default AuthSlice.reducer;