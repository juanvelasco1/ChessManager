import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { updatePlayerPoints } from "../../utils/pointsUtils";

const GameCard = ({ pair, updatePointsInRedux, fetchRankingData }) => {
  const { player1, player2 } = pair || {};
  const [player1State, setPlayer1State] = useState("initial");
  const [player2State, setPlayer2State] = useState("initial");

  const handleWinnerSelection = async (winner) => {
    if (winner === "player1") {
      if (player1State === "winner") {
        setPlayer1State("initial");
        setPlayer2State("initial");
        await updatePlayerPoints(player1, -100, updatePointsInRedux);
      } else {
        setPlayer1State("winner");
        setPlayer2State("initial");
        await updatePlayerPoints(player1, 100, updatePointsInRedux);
      }
    } else if (winner === "player2") {
      if (player2State === "winner") {
        setPlayer2State("initial");
        setPlayer1State("initial");
        await updatePlayerPoints(player2, -100, updatePointsInRedux);
      } else {
        setPlayer2State("winner");
        setPlayer1State("initial");
        await updatePlayerPoints(player2, 100, updatePointsInRedux);
      }
    }
    fetchRankingData(); // Actualizar el ranking después de modificar los puntos
  };

  const handleDrawPoints = async () => {
    try {
      const pointsToAdd = 50; // Puntos por empate
      const updatedPlayer1Points = player1.points + pointsToAdd;
      const updatedPlayer2Points = player2.points + pointsToAdd;

      setPlayer1Points(updatedPlayer1Points); // Actualizar visualmente los puntos
      setPlayer2Points(updatedPlayer2Points);

      // Actualizar los puntos en Firestore y Redux
      await updateFirestorePoints(player1, pointsToAdd, roomId);
      await updateFirestorePoints(player2, pointsToAdd, roomId);
    } catch (error) {
      console.error("Error al actualizar los puntos por empate:", error);
    }
  };

  // Lógica para estilos dinámicos según el resultado
  const resultStyles = {
    player1: {
      backgroundColor: "#434379",
    },
    player2: {
      backgroundColor: "#434379",
    },
    draw: {
      backgroundColor: "#434379",
    },
  };

  if (player1Points > player2Points) {
    resultStyles.player1.backgroundColor = "#4CAF50";
    resultStyles.player2.backgroundColor = "#C62828";
  } else if (player1Points < player2Points) {
    resultStyles.player1.backgroundColor = "#C62828";
    resultStyles.player2.backgroundColor = "#4CAF50";
  } else if (player1Points === player2Points && player1Points !== 0) {
    resultStyles.player1.backgroundColor = "#9E9E9E";
    resultStyles.player2.backgroundColor = "#9E9E9E";
    resultStyles.draw.backgroundColor = "#9E9E9E";
  }

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
        maxWidth: "420px",
        width: "100%",
        mx: "auto",
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
console.log("GameCard component loaded");
export default GameCard;