import GameCard from "../../components/GameCard/GameCard";
import { Box, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";

// Assumes firebaseDb is globally accessible from window

const GameTournamentScreen = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const [pairs, setPairs] = useState([]); // Lista de parejas
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Escucha los cambios en la sala en tiempo real
    const roomRef = doc(window.firebaseDb, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const roomData = docSnapshot.data();
        setPairs(roomData.pairs || []); // Actualiza las parejas
      }
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, [roomId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        width: isMobile ? 410 : "100%",
        mx: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        pt: 3,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#000039"
        textAlign="center"
        mb={2}
      >
        Todos vs todos
      </Typography>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 35,
          left: 16,
          zIndex: 999,
          color: "#000039",
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          pr: 1,
        }}
      >
        {pairs.map((pair, index) => (
          <GameCard key={index} pair={pair} />
        ))}
      </Box>
    </Box>
  );
};

export default GameTournamentScreen;