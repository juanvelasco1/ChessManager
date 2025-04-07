import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();

    return(
        <>
            <div>
                <button onClick={() => navigate("/home-teacher")}>
                    <img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/60acd42c40fbe6f3ca84d22e06cfa1e915e00a4c/%F0%9F%A6%86%20icon%20_home_.svg" alt="Inicio" />
                </button>
                <button onClick={() => navigate("/settings-tournament")}>
                    <img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/60acd42c40fbe6f3ca84d22e06cfa1e915e00a4c/%F0%9F%A6%86%20icon%20_Chess_.svg" alt="Create" />
                </button>
            </div>
        </>
    )
};

export default NavBar;