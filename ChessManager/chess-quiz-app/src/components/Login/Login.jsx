import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    return (
        <>
        <div>
            <div>
                <img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/994864e6d407751510742627ffb6c58aa3d305d5/LOGO%20AZUL.svg" alt="" />
                <span>La estrategia, en tus manos.</span>
            </div>
            <div>
                <form>
                    <input type="email" name="email" id="user-email" />
                    <input type="password" name="password" id="user-password" />
                    <button type="submit" onClick={() => navigate ("/home")}>Ingresar</button>
                    <button onClick={() => navigate ("/register")}>Registrarte</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;