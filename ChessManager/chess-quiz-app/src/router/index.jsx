import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { LoginScreen, RegisterScreen, HomeScreen, LoadingScreen, QuizScreen, HomeTeacherScreen, SettingsTournamentScreen, LobbyScreen, GameTournamentScreen } from '../pages';

const Router = () => {
    return (
            <Routes>
                <Route path="/" element={<LoadingScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/quiz" element={<QuizScreen />} />
                <Route path="/home-teacher" element={<HomeTeacherScreen />} />
                <Route path="/settings-tournament" element={<SettingsTournamentScreen />} />
                <Route path="/lobby" element={<LobbyScreen />} />
                <Route path="/game-tournament" element={<GameTournamentScreen />} />
            </Routes>
    );
};

export default Router;