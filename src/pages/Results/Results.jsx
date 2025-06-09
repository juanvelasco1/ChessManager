import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const ResultsScreen = () => {
  const navigate = useNavigate();
  const reduxParticipants = useSelector((state) => state.auth.participants);
  const user = useSelector((state) => state.auth);
  const [participants, setParticipants] = useState(reduxParticipants);
  const [loading, setLoading] = useState(false);

  // Intenta cargar los participantes desde Firestore si no hay en Redux
  useEffect(() => {
    if (!participants || participants.length === 0) {
      const fetchParticipants = async () => {
        setLoading(true);
        // Busca la última sala activa del usuario
        // Si tienes el roomId en Redux o en localStorage, úsalo directamente
        const roomId = localStorage.getItem("lastRoomId") || user.lastRoomId;
        if (!roomId) {
          setLoading(false);
          return;
        }
        const roomRef = doc(db, "rooms", roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          const roomData = roomSnap.data();
          setParticipants(roomData.participants || []);
        }
        setLoading(false);
      };
      fetchParticipants();
    }
  }, [participants, user]);

  const getResultMessage = () => {
    if (!participants || participants.length === 0) return "Cargando resultados...";

    // Ordena los participantes por puntos de mayor a menor
    const sortedParticipants = [...participants].sort((a, b) => b.points - a.points);
    const userData = sortedParticipants.find((p) => p.uid === user.uid);

    if (!userData) return "No se encontró tu resultado.";

    const userPoints = userData.points;
    const samePoints = sortedParticipants.filter((p) => p.points === userPoints);

    if (samePoints.length > 1) {
      return "¡Es un empate!";
    }

    const maxPoints = sortedParticipants[0].points;
    const minPoints = sortedParticipants[sortedParticipants.length - 1].points;

    if (userPoints === maxPoints) {
      return "¡Felicidades, ganaste!";
    }
    if (userPoints === minPoints) {
      return "Lo sentimos, perdiste.";
    }
    return "¡Buen juego!";
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