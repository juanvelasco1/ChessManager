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

  const handleDrawSelection = async () => {
    if (player1State === "draw" && player2State === "draw") {
      setPlayer1State("initial");
      setPlayer2State("initial");
      await updatePlayerPoints(player1, -50, updatePointsInRedux);
      await updatePlayerPoints(player2, -50, updatePointsInRedux);
    } else {
      setPlayer1State("draw");
      setPlayer2State("draw");
      await updatePlayerPoints(player1, 50, updatePointsInRedux);
      await updatePlayerPoints(player2, 50, updatePointsInRedux);
    }
    fetchRankingData(); // Actualizar el ranking después de modificar los puntos
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        bgcolor: "#000039",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        padding: "20px",
        margin: "0 auto 20px",
        width: "90%",
        maxWidth: "500px",
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
          gap: 2,
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
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginBottom: 4,
              border:
                player1State === "winner"
                  ? "2px solid #28a745"
                  : player1State === "draw"
                  ? "2px solid #ffc107"
                  : "2px solid transparent",
            }}
          />
          <Typography fontWeight="bold" color="white" fontSize="14px">
            {player1?.nickname || "Jugador 1"}
          </Typography>
        </Box>

        {/* Texto VS */}
        <Typography
          fontWeight="bold"
          color="white"
          fontSize="18px"
          sx={{ display: "flex", alignItems: "center" }}
        >
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
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginBottom: 4,
              border:
                player2State === "winner"
                  ? "2px solid #28a745"
                  : player2State === "draw"
                  ? "2px solid #ffc107"
                  : "2px solid transparent",
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
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleWinnerSelection("player1")}
          sx={{
            backgroundColor: player1State === "winner" ? "#28a745" : "#2f2f77",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            flex: 1,
            fontSize: "12px",
            minWidth: "30%",
            "&:hover": {
              backgroundColor: player1State === "winner" ? "#218838" : "#2f2f77",
            },
          }}
        >
          {player1State === "winner" ? "Deseleccionar" : "Ganador"}
        </Button>
        <Button
          variant="contained"
          onClick={handleDrawSelection}
          sx={{
            backgroundColor:
              player1State === "draw" && player2State === "draw"
                ? "#6c757d"
                : "#2f2f77",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            flex: 1,
            fontSize: "12px",
            minWidth: "30%",
            "&:hover": {
              backgroundColor:
                player1State === "draw" && player2State === "draw"
                  ? "#5a6268"
                  : "#2f2f77",
            },
          }}
        >
          {player1State === "draw" && player2State === "draw"
            ? "Deseleccionar"
            : "Empate"}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleWinnerSelection("player2")}
          sx={{
            backgroundColor: player2State === "winner" ? "#28a745" : "#2f2f77",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            flex: 1,
            fontSize: "12px",
            minWidth: "30%",
            "&:hover": {
              backgroundColor: player2State === "winner" ? "#218838" : "#2f2f77",
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