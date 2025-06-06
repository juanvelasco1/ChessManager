import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { Box, Typography } from "@mui/material";

const JoinRoomScreen = () => {
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const navigate = useNavigate();

  // Obtener datos directamente desde localStorage
  const uid = localStorage.getItem("uid");
  const nickname = localStorage.getItem("nickname") || "Anónimo"; // Valor predeterminado si no existe
  const avatar = localStorage.getItem("avatar") || "/avatars/default-avatar.png"; // Valor predeterminado si no existe
  const points = parseInt(localStorage.getItem("points"), 10) || 0; // Valor predeterminado si no existe

  useEffect(() => {
    const validateAndJoinRoom = async () => {
      if (!uid) {
        // Si no está autenticado, redirige al login con el parámetro de redirección
        navigate(`/login?redirect=/join-room/${roomId}`);
        return;
      }

      try {
        const roomRef = doc(db, "rooms", roomId);
        const roomSnapshot = await getDoc(roomRef);

        if (roomSnapshot.exists()) {
          // Agrega al usuario a la sala
          const userData = {
            uid,
            nickname,
            avatar,
            points,
          };

          await updateDoc(roomRef, {
            participants: arrayUnion(userData),
          });

          // Redirige a la pantalla de espera
          navigate(`/waiting/${roomId}`);
        } else {
          alert("La sala no existe.");
          navigate("/home");
        }
      } catch (error) {
        console.error("Error al unirse a la sala:", error);
        alert("Hubo un problema al unirse a la sala.");
      }
    };

    validateAndJoinRoom();
  }, [uid, roomId, navigate, nickname, avatar, points]);

  return (
    <Box textAlign="center" mt={4}>
      <Typography fontWeight="bold" color="#000039" fontSize="20px">
        Validando tu acceso...
      </Typography>
    </Box>
  );
};

export default JoinRoomScreen;