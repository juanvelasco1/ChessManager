import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebaseConfig.js";
import { useDispatch } from "react-redux";
import { logout, setUser, setTypeRol } from "../store/authSlice.js";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; // Importar Firestore
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
} from "../pages";

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user.uid));

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setTypeRol(userData.role || "jugador"));
          } else {
            console.error("El documento del usuario no existe en Firestore.");
          }
        } catch (error) {
          console.error("Error al obtener el rol del usuario desde Firestore:", error);
        }
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
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
            <ProtectedRoute requiredRole="administrador">
              <HomeTeacherScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings-tournament"
          element={
            <ProtectedRoute requiredRole="administrador">
              <SettingsTournamentScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lobby"
          element={
            <ProtectedRoute requiredRole="administrador">
              <LobbyScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game-tournament"
          element={
            <ProtectedRoute requiredRole="administrador">
              <GameTournamentScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<div>Acceso denegado</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;