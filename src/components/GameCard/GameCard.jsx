import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const GameCard = ({ pair, updatePoints }) => {
  const { player1, player2 } = pair || {};
  const [player1State, setPlayer1State] = useState("initial"); // Estados: initial, winner, draw
  const [player2State, setPlayer2State] = useState("initial");

  const handleWinnerSelection = (winner) => {
    if (winner === "player1") {
      if (player1State === "winner") {
        // Deseleccionar ganador
        setPlayer1State("initial");
        setPlayer2State("initial");
        if (updatePoints) updatePoints(player1, -100); // Restar puntos si se deselecciona
      } else {
        // Seleccionar ganador
        setPlayer1State("winner");
        setPlayer2State("initial"); // Perdedor no suma ni resta puntos
        if (updatePoints) updatePoints(player1, 100);
      }
    } else if (winner === "player2") {
      if (player2State === "winner") {
        // Deseleccionar ganador
        setPlayer2State("initial");
        setPlayer1State("initial");
        if (updatePoints) updatePoints(player2, -100); // Restar puntos si se deselecciona
      } else {
        // Seleccionar ganador
        setPlayer2State("winner");
        setPlayer1State("initial"); // Perdedor no suma ni resta puntos
        if (updatePoints) updatePoints(player2, 100);
      }
    }
  };

  const handleDrawSelection = () => {
    if (player1State === "draw" && player2State === "draw") {
      // Deseleccionar empate
      setPlayer1State("initial");
      setPlayer2State("initial");
      if (updatePoints) {
        updatePoints(player1, -50); // Restar puntos si se deselecciona
        updatePoints(player2, -50); // Restar puntos si se deselecciona
      }
    } else {
      // Seleccionar empate
      setPlayer1State("draw");
      setPlayer2State("draw");
      if (updatePoints) {
        updatePoints(player1, 50);
        updatePoints(player2, 50);
      }
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