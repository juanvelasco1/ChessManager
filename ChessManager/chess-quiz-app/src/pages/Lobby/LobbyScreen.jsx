import UserLobby from "../../components/UserLobby/UserLobby";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {

    const navigate = useNavigate();

    return(
        <>
            <div>
                <h1>Todos vs todos</h1>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="" />
                </div>
                <div>
                    <span>8</span>
                    <h3>Participantes</h3>
                </div>
                <div>
                    <UserLobby />
                </div>
                <button onClick={() => navigate("/game-tournament")}>Iniciar</button>
            </div>
        </>
    )
};

export default LobbyScreen;