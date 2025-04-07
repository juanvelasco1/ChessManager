import { Box, Button, Typography } from "@mui/material";
import NavBar from "../../components/Navbar/Navbar";

const SettingTournamentScreen = () => {
  return (
    <>
      <Box
        sx={{
          mt: "75px", // espacio desde arriba
          width: 420,
          mx: "auto",
          display: "flex",
          gap: "10px", // separación entre botones
          justifyContent: "center",
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
            fontWeight: "bold",
            fontSize: "16px",
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
          <Typography align="center">Todos vs<br />todos</Typography>
        </Button>
      </Box>

      <NavBar />
    </>
  );
};

export default SettingTournamentScreen;