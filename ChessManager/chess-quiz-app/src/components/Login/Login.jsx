import React from 'react';
import './Login.css';
const Login = () => {
    return (
        <div className="Login-form">
            <div className="header-login">
                <img className="Image" src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/994864e6d407751510742627ffb6c58aa3d305d5/LOGO%20AZUL.svg" alt="" />
                <span className="estrategia" >La estrategia, en tus manos.</span>
            </div>
            <div className="body-login">
                <form>
                    <input type="email" name="" id="" placeholder='Correo' required/>
                    <input type="password" name="" id="" placeholder='Contraseña' required/>
                    <button type="submit">Ingresar</button>
                    <button>Registrarte</button>
                </form>
            </div>
        </div>
    );
}

export default Login;