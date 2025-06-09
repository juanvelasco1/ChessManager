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
  const [loading, setLoading] = useState(true);
  const [resultMessage, setResultMessage] = useState("Cargando resultados...");

  // Primer useEffect: carga participantes
  useEffect(() => {
    if (!participants || participants.length === 0) {
      const fetchParticipants = async () => {
        setLoading(true);
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
    } else {
      setLoading(false);
    }
  }, [participants, user]);

  // Segundo useEffect: calcula el mensaje cuando cambian los participantes
  useEffect(() => {
    if (loading) {
      setResultMessage("Cargando resultados...");
      return;
    }
    if (!participants || participants.length === 0) {
      setResultMessage("Cargando resultados...");
      return;
    }

    const sortedParticipants = [...participants].sort((a, b) => b.points - a.points);
    const userData = sortedParticipants.find((p) => p.uid === user.uid);

    if (!userData) {
      setResultMessage("No se encontró tu resultado.");
      return;
    }

    const userPoints = userData.points;
    const samePoints = sortedParticipants.filter((p) => p.points === userPoints);

    if (samePoints.length > 1) {
      setResultMessage("¡Es un empate!");
      return;
    }

    const maxPoints = sortedParticipants[0].points;
    const minPoints = sortedParticipants[sortedParticipants.length - 1].points;

    if (userPoints === maxPoints) {
      setResultMessage("¡Felicidades, ganaste!");
      return;
    }
    if (userPoints === minPoints) {
      setResultMessage("Lo sentimos, perdiste.");
      return;
    }
    setResultMessage("¡Buen juego!");
  }, [participants, loading, user]);

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
        {resultMessage}
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