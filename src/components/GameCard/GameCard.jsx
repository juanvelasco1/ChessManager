import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const GameCard = ({ pair }) => {
  const { player1, player2 } = pair || {};
  const [player1Selected, setPlayer1Selected] = useState(false);
  const [player2Selected, setPlayer2Selected] = useState(false);

  const togglePlayerSelection = (player, setSelected) => {
    setSelected((prevSelected) => !prevSelected); // Alternar selección
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
              border: player1Selected ? "2px solid green" : "none",
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
              border: player2Selected ? "2px solid green" : "none",
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
          onClick={() => togglePlayerSelection(player1, setPlayer1Selected)}
          sx={{
            backgroundColor: player1Selected ? "#28a745" : "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: player1Selected ? "#218838" : "#434379",
            },
          }}
        >
          {player1Selected ? "Deseleccionar" : "Seleccionar"}
        </Button>
        <Button
          variant="contained"
          onClick={() => togglePlayerSelection(player2, setPlayer2Selected)}
          sx={{
            backgroundColor: player2Selected ? "#28a745" : "#434379",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            width: "30%",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: player2Selected ? "#218838" : "#434379",
            },
          }}
        >
          {player2Selected ? "Deseleccionar" : "Seleccionar"}
        </Button>
      </Box>
    </Box>
  );
};

export default GameCard;