import { Box, Button, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../utils/roomUtils";
import { useSelector } from "react-redux";

const SettingTournamentScreen = () => {
  const navigate = useNavigate();
  const teacherUid = useSelector((state) => state.auth.uid); // UID del profesor

  const handleCreateRoom = async () => {
    try {
      const roomId = await createRoom(teacherUid); // Crea la sala en Firebase
      navigate(`/lobby/${roomId}`); // Redirige al lobby con el ID de la sala
    } catch (error) {
      console.error("Error al crear la sala:", error);
      alert("Hubo un problema al crear la sala. Inténtalo de nuevo.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        paddingTop: "90px",
      }}
    >
      {/* Botón de retroceso */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 999,
          color: "#000039",
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 28 }} />
      </IconButton>

      <Typography
        sx={{
          color: "#000039",
          textAlign: "center",
          fontFamily: "Roboto",
          fontSize: "30px",
          fontWeight: 600,
          marginBottom: "32px",
        }}
      >
        Modos de juego
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: {
            xs: "center", // mobile
            md: "flex-start", // desktop
          },
          paddingLeft: {
            xs: 0,
            md: "100px", // margen izquierdo en pc
          },
          transform: {
            xs: "none",
            md: "translateX(-160px)",
          },
        }}
      >
       

        {/* Botón Todos vs todos */}
        <Button
          onClick={handleCreateRoom} // Llama a la función para crear la sala
          sx={{
            width: 190,
            height: 190,
            border: "2px solid #000039",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#000039",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: 1,
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <img
            src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/7fef81aa94253148a4e96f51886ba447550c2bb9/Chess%20Pieces.svg"
            alt="Todos vs todos"
            width={50}
            height={50}
            style={{ marginBottom: 8 }}
          />
          <Typography align="center">
            Todos vs
            <br />
            todos
          </Typography>
        </Button>
      </Box>

      <NavBar />
    </Box>
  );
};

export default SettingTournamentScreen;