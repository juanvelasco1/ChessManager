import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserLobby from "../../components/UserLobby/UserLobby";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import RoomQR from "../../components/RoomQR/RoomQR";

const LobbyScreen = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const [participants, setParticipants] = useState([]); // Lista dinámica de participantes
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Escucha los cambios en la sala en tiempo real
    const roomRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const roomData = docSnapshot.data();
        setParticipants(roomData.participants || []); // Actualiza los participantes
      }
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, [roomId]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStartTournament = async () => {
    try {
      // Mezclar participantes de forma aleatoria
      const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);

      // Crear parejas
      const pairs = [];
      for (let i = 0; i < shuffledParticipants.length; i += 2) {
        const pair = shuffledParticipants.slice(i, i + 2);
        pairs.push(pair);
      }

      // Actualizar la sala en Firebase con las parejas
      const roomRef = doc(db, "rooms", roomId);
      await updateDoc(roomRef, { pairs });

      // Redirigir al profesor a la screen GameTournament
      navigate(`/game-tournament/${roomId}`);
    } catch (error) {
      console.error("Error al iniciar el torneo:", error);
      alert("Hubo un problema al iniciar el torneo. Inténtalo de nuevo.");
    }
  };

  return isMobile ? (
    <Box sx={{ width: 410, margin: 0, padding: 0, mt: 8, textAlign: "center", position: "relative" }}>
      {/* Flecha de retroceso */}
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

      <Typography fontWeight="bold" color="#000039" fontSize="40px" mb={2}>
        Todos vs todos
      </Typography>

      <RoomQR roomId={roomId} /> {/* Muestra el QR */}

      <Typography fontWeight="bold" color="#000000" fontSize="40px">
        {participants.length}
      </Typography>
      <Typography fontWeight="bold" color="#000039" fontSize="24px" mb={2}>
        Participantes
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          justifyItems: "center",
          mb: 4,
        }}
      >
        {participants.map((user, index) => (
          <UserLobby key={index} name={user.nickname} avatar={user.avatar} />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={handleStartTournament}
        sx={{
          backgroundColor: "#000039",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          width: "93%",
          height: "63px",
          py: 1.2,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#000039",
          },
        }}
      >
        INICIAR
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
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

      <Typography fontWeight="bold" color="#000039" fontSize="40px" mb={2}>
        Todos vs todos
      </Typography>

      <RoomQR roomId={roomId} /> {/* Muestra el QR */}

      <Typography fontWeight="bold" color="#000000" fontSize="40px">
        {participants.length}
      </Typography>
      <Typography fontWeight="bold" color="#000039" fontSize="24px" mb={2}>
        Participantes
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          justifyItems: "center",
          mb: 4,
        }}
      >
        {participants.map((user, index) => (
          <UserLobby key={index} name={user.nickname} avatar={user.avatar} />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={handleStartTournament}
        sx={{
          backgroundColor: "#000039",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          width: "230px",
          height: "60px",
          color: "#fff",
          mt: 2,
          "&:hover": {
            backgroundColor: "#000039",
          },
        }}
      >
        INICIAR
      </Button>
    </Box>
  );
};

export default LobbyScreen;