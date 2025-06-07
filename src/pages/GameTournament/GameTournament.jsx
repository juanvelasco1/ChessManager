import GameCard from "../../components/GameCard/GameCard";
import { Box, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig"; // Importar la instancia de Firestore
import { useDispatch } from "react-redux";
import { setPairs, setParticipants } from "../../store/authSlice";

const GameTournamentScreen = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const [pairs, setPairsState] = useState([]); // Lista de parejas
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Escucha los cambios en la sala en tiempo real
    const roomRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const roomData = docSnapshot.data();
        console.log("Datos de la sala:", roomData); // Log para depuración

        // Validar estructura de pairs
        const validPairs = roomData.pairs || [];
        setPairsState(validPairs);
        dispatch(setPairs(validPairs)); // Actualizar Redux
      } else {
        console.error("El documento de la sala no existe.");
      }
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, [roomId, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEndTournament = async () => {
    const roomRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomRef);

    if (roomSnapshot.exists()) {
      const roomData = roomSnapshot.data();
      const updatedParticipants = roomData.participants.map((participant) => ({
        ...participant,
        points: participant.points + Math.floor(Math.random() * 10), // Ejemplo: sumar puntos aleatorios
      }));

      await updateDoc(roomRef, { participants: updatedParticipants });

      // Actualizar Redux con los nuevos puntos
      dispatch(setParticipants(updatedParticipants));

      navigate("/results");
    }
  };

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
        {pairs.length > 0 ? (
          pairs.map((pair, index) => (
            <GameCard key={index} pair={pair} />
          ))
        ) : (
          <Typography
            variant="body1"
            color="#434379"
            textAlign="center"
            mt={4}
          >
            No hay parejas disponibles para mostrar.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default GameTournamentScreen;