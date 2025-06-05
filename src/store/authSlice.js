import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: localStorage.getItem("uid") || null,
  email: localStorage.getItem("email") || null,
  nickname: localStorage.getItem("nickname") || null,
  avatar: localStorage.getItem("avatar") || "/avatars/default-avatar.png", // Valor predeterminado
  points: parseInt(localStorage.getItem("points"), 10) || 0, // Valor predeterminado
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
      state.avatar = action.payload.avatar || "/avatars/default-avatar.png"; // Valor predeterminado
      state.points = action.payload.points || 0; // Valor predeterminado
      const normalizedEmail = (action.payload.email || "").trim().toLowerCase();
      const assignedRole = normalizedEmail === "administrador@gmail.com" ? "administrador" : (action.payload.rol || "jugador");
      state.rol = assignedRole;
      state.loading = false;

      // Sincronizar con localStorage
      localStorage.setItem("uid", action.payload.uid);
      localStorage.setItem("email", action.payload.email || "");
      localStorage.setItem("nickname", action.payload.nickname || "Anónimo");
      localStorage.setItem("avatar", action.payload.avatar || "/avatars/default-avatar.png");
      localStorage.setItem("points", action.payload.points || 0);
      localStorage.setItem("rol", assignedRole);
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.nickname = null;
      state.avatar = null;
      state.points = 0;
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