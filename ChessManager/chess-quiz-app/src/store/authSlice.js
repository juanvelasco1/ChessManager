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
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.nickname = null;
    },
  },
});

export const { login, logout, setUser } = AuthSlice.actions;
export default AuthSlice.reducer;