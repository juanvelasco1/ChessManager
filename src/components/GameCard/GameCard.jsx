import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const GameCard = ({ pair }) => {
  const { player1, player2 } = pair || {};
  const [player1Points, setPlayer1Points] = useState(player1?.points || 0);
  const [player2Points, setPlayer2Points] = useState(player2?.points || 0);

  const updateFirestorePoints = async (player, updatedPoints) => {
    try {
      const userRef = doc(db, "users", player.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        await updateDoc(userRef, { points: updatedPoints });
      } else {
        console.error(`El usuario con UID ${player.uid} no existe en Firestore.`);
      }
    } catch (error) {
      console.error("Error al actualizar los puntos en Firestore:", error);
    }
  };

  const handleAddPoints = async (player, setPoints, pointsToAdd) => {
    try {
      const updatedPoints = player.points + pointsToAdd;
      setPoints(updatedPoints); // Actualizar visualmente los puntos en el botón

      // Actualizar los puntos en Firestore
      await updateFirestorePoints(player, updatedPoints);
    } catch (error) {
      console.error("Error al actualizar los puntos:", error);
    }
  };

  const handleDrawPoints = async () => {
    try {
      const updatedPlayer1Points = player1.points + 50;
      const updatedPlayer2Points = player2.points + 50;

      setPlayer1Points(updatedPlayer1Points); // Actualizar visualmente los puntos
      setPlayer2Points(updatedPlayer2Points);

      // Actualizar los puntos en Firestore
      await updateFirestorePoints(player1, updatedPlayer1Points);
      await updateFirestorePoints(player2, updatedPlayer2Points);
    } catch (error) {
      console.error("Error al actualizar los puntos por empate:", error);
    }
  };

  return (
    <Box
      sx={{
        border: "1.5px solid #000039",
        bgcolor: "#000039",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        padding: 2,
        marginBottom: 2,
        width: "100%",
      }}
    >
      {/* Contenedor de los jugadores */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 2,
        }}
      >
        {/* Jugador 1 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={player1?.avatar || "/avatars/default-avatar.png"}
            alt={player1?.nickname || "Jugador 1"}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginBottom: 8,
            }}
          />
          <Typography fontWeight="bold" color="white" fontSize="14px">
            {player1?.nickname || "Jugador 1"}
          </Typography>
        </Box>

        {/* Texto VS */}
        <Typography fontWeight="bold" color="white" fontSize="16px">
          VS
        </Typography>

        {/* Jugador 2 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={player2?.avatar || "/avatars/default-avatar.png"}
            alt={player2?.nickname || "Jugador 2"}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginBottom: 8,
            }}
          />
          <Typography fontWeight="bold" color="white" fontSize="14px">
            {player2?.nickname || "Jugador 2"}
          </Typography>
        </Box>
      </Box>

      {/* Botones */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleAddPoints(player1, setPlayer1Points, 100)}
          sx={{
            backgroundColor: "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#434379",
            },
          }}
        >
          {`+${player1Points}`}
        </Button>
        <Button
          variant="contained"
          onClick={handleDrawPoints}
          sx={{
            backgroundColor: "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#434379",
            },
          }}
        >
          Empate
        </Button>
        <Button
          variant="contained"
          onClick={() => handleAddPoints(player2, setPlayer2Points, 100)}
          sx={{
            backgroundColor: "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#434379",
            },
          }}
        >
          {`+${player2Points}`}
        </Button>
      </Box>
    </Box>
  );
};

export default GameCard;