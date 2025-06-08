import React from "react";
import { Box, Typography, Button } from "@mui/material";

const GameCard = ({ pair }) => {
  const { player1, player2 } = pair || {};

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
          Ganador
        </Button>
        <Button
          variant="contained"
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
          Ganador
        </Button>
      </Box>
    </Box>
  );
};

export default GameCard;