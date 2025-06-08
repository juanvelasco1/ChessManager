import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ResultsScreen = () => {
  const navigate = useNavigate();
  const participants = useSelector((state) => state.auth.participants); // Obtener los participantes desde Redux
  const user = useSelector((state) => state.auth); // Obtener los datos del usuario actual

  const getResultMessage = () => {
    const sortedParticipants = [...participants].sort(
      (a, b) => b.points - a.points
    );
    const userRank = sortedParticipants.findIndex((p) => p.uid === user.uid) + 1;

    if (userRank === 1) {
      return "¡Felicidades, ganaste!";
    } else if (userRank === sortedParticipants.length) {
      return "Lo sentimos, perdiste.";
    } else {
      return "¡Es un empate!";
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
        Ir al inicio
      </Button>
    </Box>
  );
};

export default ResultsScreen;