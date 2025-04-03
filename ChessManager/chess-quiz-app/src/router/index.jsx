import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { LoginScreen, RegisterScreen, HomeScreen } from '../pages';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/home" element={<HomeScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;