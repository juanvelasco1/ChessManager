import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const GameCard = ({ pair, updatePointsInRedux, fetchRankingData }) => {
  const { player1, player2 } = pair || {};
  const [player1State, setPlayer1State] = useState("initial");
  const [player2State, setPlayer2State] = useState("initial");

  const updatePointsInFirebase = async (player, points) => {
    try {
      const userRef = doc(db, "users", player.uid);
      await updateDoc(userRef, {
        points: player.points + points,
      });
      console.log(`Puntos actualizados en Firebase para ${player.nickname}: ${points}`);
      fetchRankingData(); // Actualizar el ranking después de modificar los puntos
    } catch (error) {
      console.error("Error al actualizar puntos en Firebase:", error);
    }
  };

  const updatePoints = (player, points) => {
    updatePointsInRedux(player.uid, points); // Actualizar puntos en Redux
    updatePointsInFirebase(player, points); // Actualizar puntos en Firebase
  };

  const handleWinnerSelection = (winner) => {
    if (winner === "player1") {
      if (player1State === "winner") {
        setPlayer1State("initial");
        setPlayer2State("initial");
        updatePoints(player1, -100);
      } else {
        setPlayer1State("winner");
        setPlayer2State("initial");
        updatePoints(player1, 100);
      }
    } else if (winner === "player2") {
      if (player2State === "winner") {
        setPlayer2State("initial");
        setPlayer1State("initial");
        updatePoints(player2, -100);
      } else {
        setPlayer2State("winner");
        setPlayer1State("initial");
        updatePoints(player2, 100);
      }
    }
  };

  const handleDrawSelection = () => {
    if (player1State === "draw" && player2State === "draw") {
      setPlayer1State("initial");
      setPlayer2State("initial");
      updatePoints(player1, -50);
      updatePoints(player2, -50);
    } else {
      setPlayer1State("draw");
      setPlayer2State("draw");
      updatePoints(player1, 50);
      updatePoints(player2, 50);
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
              border: player1State === "winner" ? "2px solid green" : player1State === "draw" ? "2px solid orange" : "none",
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
              border: player2State === "winner" ? "2px solid green" : player2State === "draw" ? "2px solid orange" : "none",
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
          onClick={() => handleWinnerSelection("player1")}
          sx={{
            backgroundColor: player1State === "winner" ? "#28a745" : "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: player1State === "winner" ? "#218838" : "#434379",
            },
          }}
        >
          {player1State === "winner" ? "Deseleccionar" : "Ganador"}
        </Button>
        <Button
          variant="contained"
          onClick={handleDrawSelection}
          sx={{
            backgroundColor: player1State === "draw" && player2State === "draw" ? "#ffc107" : "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: player1State === "draw" && player2State === "draw" ? "#e0a800" : "#434379",
            },
          }}
        >
          {player1State === "draw" && player2State === "draw" ? "Deseleccionar" : "Empate"}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleWinnerSelection("player2")}
          sx={{
            backgroundColor: player2State === "winner" ? "#28a745" : "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: player2State === "winner" ? "#218838" : "#434379",
            },
          }}
        >
          {player2State === "winner" ? "Deseleccionar" : "Ganador"}
        </Button>
      </Box>
    </Box>
  );
};

export default GameCard;