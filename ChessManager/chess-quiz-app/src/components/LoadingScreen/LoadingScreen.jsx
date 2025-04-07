import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen = ({ loading, duration = 3000 }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [loading, navigate, duration]);

    if (loading) {
        return (
            <div style={styles.container}>
                <img
                    src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/994864e6d407751510742627ffb6c58aa3d305d5/LOGO%20AZUL.svg" // Ruta de tu logo
                    alt="App Logo"
                    style={styles.logo}
                />
                <div style={styles.spinner}>
                    <div className="loader"></div>
                </div>
            </div>
        );
    }

    return null;
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
    },
    logo: {
        width: "150px",
        height: "150px",
        marginBottom: "20px",
    },
    spinner: {
        color: "#ffffff",
    },
};

export default LoadingScreen;