import { Box, Button, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const SettingTournamentScreen = () => {
  const navigate = useNavigate();

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
        {/* Botón Crear */}
        <Button
          sx={{
            width: 190,
            height: 190,
            bgcolor: "#000039",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow: 3,
            "&:hover": {
              bgcolor: "#000039",
            },
          }}
        >
          <img
            src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/60acd42c40fbe6f3ca84d22e06cfa1e915e00a4c/%F0%9F%A6%86%20icon%20_plus%20circle_.svg"
            alt="Crear"
            width={50}
            height={50}
            style={{ marginBottom: 8 }}
          />
          Crear
        </Button>

        {/* Botón Todos vs todos */}
        <Button
          onClick={() => navigate("/lobby")}
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
            "& .MuiTypography-root": {
              fontWeight: "bold",
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