import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const WaitingDuringGameScreen = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const roomData = docSnapshot.data();
        // Si el torneo terminó (isActive es false), redirige a results
        if (roomData.isActive === false) {
          navigate("/results");
        }
      }
    });
    return () => unsubscribe();
  }, [roomId, navigate]);

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

export default WaitingDuringGameScreen;