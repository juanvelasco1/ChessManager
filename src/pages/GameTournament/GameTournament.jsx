import GameCard from "../../components/GameCard/GameCard";
import { Box, Typography, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig"; // Importar la instancia de Firestore
import { useDispatch, useSelector } from "react-redux";
import { setPairs, setParticipants } from "../../store/authSlice";
import { Modal } from "@mui/material";

const GameTournamentScreen = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const [pairs, setPairsState] = useState([]); // Lista de parejas
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.rol); // Obtener el rol del usuario desde Redux

  useEffect(() => {
    // Escucha los cambios en la sala en tiempo real
    const roomRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const roomData = docSnapshot.data();
        console.log("Datos de la sala:", roomData); // Log para depuración

        // Validar estructura de pairs
        const validPairs = (roomData.pairs || []).filter(
          (pair) => pair.player1 && pair.player2
        );
        setPairsState(validPairs);
        dispatch(setPairs(validPairs)); // Actualizar Redux
        dispatch(setParticipants(roomData.participants || [])); // Actualizar participantes en Redux
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
    try {
      const roomRef = doc(db, "rooms", roomId);
      const roomSnapshot = await getDoc(roomRef);

      if (roomSnapshot.exists()) {
        const roomData = roomSnapshot.data();

        // Resolver todas las promesas antes de actualizar Firestore
        const updatedParticipants = await Promise.all(
          roomData.participants.map(async (participant) => {
            const userRef = doc(db, "users", participant.uid);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              const currentGames = userData.games || 0;
              const currentPoints = userData.points || 0;

              // Incrementar el número de juegos y actualizar puntos
              await updateDoc(userRef, {
                games: currentGames + 1,
                points: currentPoints + (participant.points || 0), // Sumar puntos correctamente
              });

              return {
                ...participant,
                points: currentPoints + (participant.points || 0), // Actualizar puntos en el participante
              };
            } else {
              console.error(`El usuario con UID ${participant.uid} no existe en Firestore.`);
              return participant; // Retornar el participante sin cambios si no existe
            }
          })
        );

        // Actualizar los participantes en la sala
        await updateDoc(roomRef, { participants: updatedParticipants });

        // Actualizar Redux con los nuevos puntos
        dispatch(setParticipants(updatedParticipants));

        if (userRole === "profesor") {
          alert("El torneo ha finalizado con éxito.");
          navigate("/home-teacher");
        } else {
          navigate("/results");
        }
      }
    } catch (error) {
      console.error("Error al finalizar el torneo:", error);
      alert("Hubo un problema al finalizar el torneo.");
    }
  };

  const handleConfirmEndTournament = async () => {
    setOpenModal(false);
    await handleEndTournament(); // Guardar puntos y finalizar torneo
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
            <GameCard key={index} pair={pair} roomId={roomId} />
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

      <Box>
        {/* Botón de Finalizar Torneo */}
        {userRole === "profesor" && (
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)} // Abrir modal de confirmación
            sx={{
              bgcolor: "#000039",
              color: "#fff",
              borderRadius: "10px",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              mt: 3,
              mx: "auto",
              "&:hover": {
                bgcolor: "#000039",
              },
            }}
          >
            Finalizar Torneo
          </Button>
        )}
      </Box>

      {/* Modal de Confirmación */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: "10px",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            ¿Estás seguro de que deseas finalizar el torneo?
          </Typography>
          <Button
            variant="contained"
            onClick={handleConfirmEndTournament}
            sx={{
              bgcolor: "#28a745",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "10px",
              mx: 1,
              "&:hover": {
                bgcolor: "#218838",
              },
            }}
          >
            Sí, finalizar
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            sx={{
              color: "#000039",
              borderColor: "#000039",
              fontWeight: "bold",
              borderRadius: "10px",
              mx: 1,
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default GameTournamentScreen;