import NavBar from "../../components/Navbar/Navbar";

const SettingTournamentScreen = () => {
    return (
        <>
            <div>
                <button>
                    <img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/60acd42c40fbe6f3ca84d22e06cfa1e915e00a4c/%F0%9F%A6%86%20icon%20_plus%20circle_.svg" alt="Create" />
                    Crear
                </button>
                <button>
                    <img src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/7fef81aa94253148a4e96f51886ba447550c2bb9/Chess%20Pieces.svg" alt="Todos vs todos" />
                    Todos vs todos
                </button>
            </div>
            <div>
                <NavBar />
            </div>
        </>
    )
};

export default SettingTournamentScreen;