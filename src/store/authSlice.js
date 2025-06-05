import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: localStorage.getItem("uid") || null,
  email: localStorage.getItem("email") || null,
  nickname: localStorage.getItem("nickname") || null,
  avatar: localStorage.getItem("avatar") || null, 
  rol: localStorage.getItem("rol") || null,
  loading: true,
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
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;
      const normalizedEmail = (action.payload.email || "").trim().toLowerCase();
      const assignedRole = normalizedEmail === "administrador@gmail.com" ? "administrador" : (action.payload.rol || "jugador");
      state.rol = assignedRole;
      state.loading = false;
      localStorage.setItem("uid", action.payload.uid);
      if (action.payload.email !== null) {
        localStorage.setItem("email", action.payload.email);
      }
      localStorage.setItem("nickname", action.payload.nickname);
      localStorage.setItem("avatar", action.payload.avatar);
      localStorage.setItem("rol", assignedRole);
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.nickname = null;
      state.rol = "jugador";
      state.loading = false;
      localStorage.clear();
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setUser, setTypeRol, setLoading } = AuthSlice.actions;
export default AuthSlice.reducer;