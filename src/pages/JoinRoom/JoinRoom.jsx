import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { Box, Typography } from "@mui/material";

const JoinRoomScreen = () => {
  const { roomId } = useParams(); // Obtiene el ID de la sala desde la URL
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.uid); // UID del usuario autenticado
  const nickname = useSelector((state) => state.auth.nickname); // Nickname del usuario
  const avatar = useSelector((state) => state.auth.avatar); // Avatar del usuario
  const points = useSelector((state) => state.auth.points); // Puntos del usuario

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
            nickname: nickname || "Anónimo", // valor por defecto si nickname es undefined
            avatar: avatar || "default-avatar-url", // valor por defecto si avatar es undefined
            points: 0
          };
          
          await updateDoc(roomRef, {
            participants: arrayUnion(userData),
          });

          // Redirige al lobby
          navigate(`/lobby/${roomId}`);
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