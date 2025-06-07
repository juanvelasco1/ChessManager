import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const WaitingDuringGame = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <CircularProgress sx={{ color: "#000039", mb: 2 }} />
      <Typography
        variant="h6"
        sx={{
          color: "#000039",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        El torneo está en progreso, por favor espera...
      </Typography>
    </Box>
  );
};

export default WaitingDuringGame;