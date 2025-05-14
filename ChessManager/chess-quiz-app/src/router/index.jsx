import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { logout, setUser } from '../store/authSlice.js'; 
import { useEffect } from 'react';
import PrivateRoute from '../components/ProtectedRoutes.jsx';

import { 
  LoginScreen, 
  RegisterScreen, 
  HomeScreen, 
  LoadingScreen, 
  QuizScreen, 
  HomeTeacherScreen, 
  SettingsTournamentScreen, 
  LobbyScreen, 
  GameTournamentScreen 
} from '../pages';

const Router = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user.uid));
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
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/quiz" element={<PrivateRoute><QuizScreen /></PrivateRoute>} />
                <Route path="/home-teacher" element={<PrivateRoute><HomeTeacherScreen /></PrivateRoute>} />
                <Route path="/settings-tournament" element={<PrivateRoute><SettingsTournamentScreen /></PrivateRoute>} />
                <Route path="/lobby" element={<PrivateRoute><LobbyScreen /></PrivateRoute>} />
                <Route path="/game-tournament" element={<PrivateRoute><GameTournamentScreen /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;