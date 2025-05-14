import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  nickname: null,
  rol: "jugador",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload;
      localStorage.setItem("uid", action.payload);
    },
    setTypeRol: (state, action) => {
      state.rol = action.payload;
      localStorage.setItem("rol", action.payload);
    },

    login: (state, action) => {
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.uid = null;
    },
  },
});

export const { login, logout, setUser, setTypeRol } = AuthSlice.actions;
export default AuthSlice.reducer;