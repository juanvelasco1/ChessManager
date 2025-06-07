import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  nickname: null,
  avatar: null,
  points: 0,
  rol: null,
  participants: [],
  pairs: [],
  ranking: [],
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
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    setPairs: (state, action) => {
      state.pairs = action.payload;
    },
    setRanking: (state, action) => {
      state.ranking = action.payload;
    },
  },
});

export const { login, logout, setUser, setTypeRol, setLoading, setParticipants, setPairs, setRanking } = AuthSlice.actions;
export default AuthSlice.reducer;