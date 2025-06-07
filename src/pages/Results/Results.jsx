import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResultsScreen = ({ result }) => {
  const navigate = useNavigate();

  const getResultMessage = () => {
    switch (result) {
      case "win":
        return "¡Felicidades, ganaste!";
      case "lose":
        return "Lo sentimos, perdiste.";
      case "draw":
        return "¡Es un empate!";
      default:
        return "Resultado desconocido.";
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#000039",
          fontWeight: "bold",
          textAlign: "center",
          mb: 2,
        }}
      >
        {getResultMessage()}
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/home")}
        sx={{
          bgcolor: "#000039",
          color: "#fff",
          borderRadius: "10px",
          fontWeight: "bold",
          px: 4,
          py: 1.5,
          "&:hover": {
            bgcolor: "#000039",
          },
        }}
      >
        Ir al Home
      </Button>
    </Box>
  );
};

export default ResultsScreen;