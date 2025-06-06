import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthorizedScreen = () => {
  const navigate = useNavigate();

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
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#000039",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Acceso Denegado
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#434379",
          mb: 4,
        }}
      >
        No tienes permisos para acceder a esta página.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/login")}
        sx={{
          bgcolor: "#000039",
          color: "#fff",
          borderRadius: "10px",
          fontWeight: "bold",
          px: 4,
          py: 1.5,
          "&:hover": {
            bgcolor: "#000039",
          },
        }}
      >
        Ir al Login
      </Button>
    </Box>
  );
};

export default UnauthorizedScreen;