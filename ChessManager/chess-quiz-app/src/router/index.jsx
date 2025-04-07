import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { LoginScreen, RegisterScreen, HomeScreen, LoadingScreen, QuizScreen } from '../pages';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoadingScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/quiz" element={<QuizScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;