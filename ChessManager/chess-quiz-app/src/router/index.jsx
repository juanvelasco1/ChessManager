import { Routes, Route } from 'react-router-dom';
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
            <Routes>
                <Route path="/" element={<LoadingScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                    <PrivateRoute path="/home">
                    
                    </PrivateRoute>
                    <PrivateRoute path="/quiz" element={<QuizScreen />} />
                    <PrivateRoute path="/home-teacher" element={<HomeTeacherScreen />} />
                    <PrivateRoute path="/settings-tournament" element={<SettingsTournamentScreen />} />
                    <PrivateRoute path="/lobby" element={<LobbyScreen />} />
                    <PrivateRoute path="/game-tournament" element={<GameTournamentScreen />} />
            </Routes>
    );
};

export default Router;