import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig.js";
import { useDispatch } from "react-redux";
import { logout, setUser, login, setLoading } from "../store/authSlice.js";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "../components/ProtectedRoutes.jsx";

import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  LoadingScreen,
  QuizScreen,
  HomeTeacherScreen,
  SettingsTournamentScreen,
  LobbyScreen,
  GameTournamentScreen,
  JoinRoomScreen,
  WaitingScreen,
  UnauthorizedScreen,
  ResultsScreen,
  WaitingDuringGameScreen,
} from "../pages/index.jsx";

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true)); // Inicia la carga

    const uid = localStorage.getItem("uid");
    const email = localStorage.getItem("email");
    const nickname = localStorage.getItem("nickname");
    const avatar = localStorage.getItem("avatar");
    const points = parseInt(localStorage.getItem("points"), 10) || 0;
    const rol = localStorage.getItem("rol");

    if (uid) {
      dispatch(
        login({
          uid,
          email,
          nickname,
          avatar,
          points,
          rol,
        })
      );
      dispatch(setLoading(false));
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          dispatch(setUser(uid));

          try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const normalizedEmail = (user.email || "").trim().toLowerCase();
              dispatch(
                login({
                  uid,
                  email: user.email || userData.email || null,
                  rol: normalizedEmail === "administrador@gmail.com" ? "administrador" : "jugador",
                })
              );
              dispatch(setLoading(false));
            }
          } catch (error) {
            console.error("Error al obtener el rol del usuario desde Firestore:", error);
            dispatch(setLoading(false));
          }
        } else {
          dispatch(logout());
          dispatch(setLoading(false));
        }
      });

      return () => unsubscribe();
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="jugador">
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute requiredRole="jugador">
              <QuizScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home-teacher"
          element={
            <ProtectedRoute requiredRole="profesor">
              <HomeTeacherScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings-tournament"
          element={
            <ProtectedRoute requiredRole="profesor">
              <SettingsTournamentScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lobby"
          element={
            <ProtectedRoute requiredRole="profesor">
              <LobbyScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lobby/:roomId"
          element={
            <ProtectedRoute requiredRole="profesor">
              <LobbyScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game-tournament/:roomId"
          element={
            <ProtectedRoute requiredRole="profesor">
              <GameTournamentScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedScreen />} />
        <Route path="/join-room/:roomId" element={<JoinRoomScreen />} />
        <Route path="/waiting/:roomId" element={<WaitingScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/waiting-during-game/:roomId" element={
            <ProtectedRoute requiredRole="jugador">
              <WaitingDuringGameScreen />
            </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;