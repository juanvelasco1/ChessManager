import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { LoginScreen, RegisterScreen } from '../pages';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;