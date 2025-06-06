import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const WaitingScreen = () => {
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const navigate = useNavigate();
  const [isTournamentStarted, setIsTournamentStarted] = useState(false);

  useEffect(() => {
    // Escucha los cambios en la sala en tiempo real
    const roomRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const roomData = docSnapshot.data();
        if (roomData.pairs) {
          // Si el torneo ha comenzado (se han creado las parejas), redirige al usuario
          setIsTournamentStarted(true);
          navigate(`/game-tournament/${roomId}`);
        }
      }
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, [roomId, navigate]);

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
      <CircularProgress sx={{ color: "#000039", mb: 2 }} />
      <Typography
        variant="h6"
        sx={{
          color: "#000039",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Esperando a que el profesor inicie el torneo...
      </Typography>
    </Box>
  );
};

export default WaitingScreen;