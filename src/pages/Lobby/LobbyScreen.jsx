import { Box, Typography, Button, IconButton, Modal } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserLobby from "../../components/UserLobby/UserLobby";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import RoomQR from "../../components/RoomQR/RoomQR";

const LobbyScreen = () => {
  const navigate = useNavigate();
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const [participants, setParticipants] = useState([]); // Lista dinámica de participantes
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const userRole = useSelector((state) => state.auth.rol); // Obtén el rol del usuario desde Redux

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
      // Validar que haya participantes
      if (participants.length === 0) {
        alert("No hay suficientes participantes para iniciar el torneo.");
        return;
      }

      console.log("Participantes antes de mezclar:", participants);

      // Mezclar participantes de forma aleatoria
      const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);

      // Crear parejas como objetos
      const pairs = [];
      for (let i = 0; i < shuffledParticipants.length; i += 2) {
        const pair = {
          player1: shuffledParticipants[i],
          player2: shuffledParticipants[i + 1] || null, // Si hay un número impar, el último jugador no tendrá pareja
        };
        pairs.push(pair);
      }

      console.log("Parejas creadas:", pairs);

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
          <UserLobby key={index} nickname={user.nickname} avatar={user.avatar} />
        ))}
      </Box>

      {/* Mostrar el botón solo si el usuario es profesor */}
      {userRole === "profesor" && (
        <>
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)} // Abre el modal
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

          {/* Modal de confirmación */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)} // Cierra el modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                p: 4,
                textAlign: "center",
                fontFamily: "Roboto",
              }}
            >
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                mb={2}
                sx={{
                  fontWeight: "bold",
                  color: "#000039",
                  fontFamily: "Roboto",
                }}
              >
                ¿Iniciar torneo?
              </Typography>
              <Typography
                id="modal-description"
                mb={3}
                sx={{
                  fontSize: "16px",
                  color: "#434379",
                  fontFamily: "Roboto",
                }}
              >
                ¿Estás seguro de que deseas iniciar el torneo? Esta acción no se puede deshacer.
              </Typography>
              <Box display="flex" justifyContent="space-around">
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenModal(false); // Cierra el modal
                    handleStartTournament(); // Inicia el torneo
                  }}
                  sx={{
                    backgroundColor: "#000039",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#000039",
                    },
                  }}
                >
                  Sí, iniciar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenModal(false)} // Cierra el modal
                  sx={{
                    color: "#000039",
                    borderColor: "#000039",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#000039",
                    },
                  }}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
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
          <UserLobby key={index} nickname={user.nickname} avatar={user.avatar} />
        ))}
      </Box>

      {/* Mostrar el botón solo si el usuario es profesor */}
      {userRole === "profesor" && (
        <>
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)} // Abre el modal
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

          {/* Modal de confirmación */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)} // Cierra el modal
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                p: 4,
                textAlign: "center",
                fontFamily: "Roboto",
              }}
            >
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                mb={2}
                sx={{
                  fontWeight: "bold",
                  color: "#000039",
                  fontFamily: "Roboto",
                }}
              >
                ¿Iniciar torneo?
              </Typography>
              <Typography
                id="modal-description"
                mb={3}
                sx={{
                  fontSize: "16px",
                  color: "#434379",
                  fontFamily: "Roboto",
                }}
              >
                ¿Estás seguro de que deseas iniciar el torneo? Esta acción no se puede deshacer.
              </Typography>
              <Box display="flex" justifyContent="space-around">
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenModal(false); // Cierra el modal
                    handleStartTournament(); // Inicia el torneo
                  }}
                  sx={{
                    backgroundColor: "#000039",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#000039",
                    },
                  }}
                >
                  Sí, iniciar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenModal(false)} // Cierra el modal
                  sx={{
                    color: "#000039",
                    borderColor: "#000039",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#000039",
                    },
                  }}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default LobbyScreen;