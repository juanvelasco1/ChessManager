import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import 'firebase/firestore';


const TimerInput = ({ top = "32%" }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [dateStart, setDateStart] = useState(new Date());


  useEffect(() => {
    const interval = setInterval(() => {
      const currentlyDate = new Date();
      const timeRemaining = 15 * 24 * 60 * 60 * 1000 - (currentlyDate.getTime() - dateStart.getTime());
      setTimeRemaining(timeRemaining);
      if (timeRemaining <= 0) {
        restartPointsAndRanking();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dateStart]);

  const restartPointsAndRanking = async () => {
    try {
      const db = firebase.firestore();
      const usuariosRef = db.collection('usuarios');
      const querySnapshot = await usuariosRef.get();
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          score: 0,
          rank: 0,
        });
      });
    } catch (error) {
      console.error("Error al reiniciar puntos y ranking:", error);
    }
  };

  const formatTime = (time) => {
    const day = Math.floor(time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${day}d ${hours}h ${minutes}m ${seconds}s`;
  };


  return (
    <Box
      sx={{
        position: "fixed",
        top: top,
        right: 0,
        transform: "translateY(-50%)",
        bgcolor: "#000039",
        color: "white",
        px: 3,
        py: 1.5,
        borderTopLeftRadius: "25px",
        borderBottomLeftRadius: "25px",
        boxShadow: 3,
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: "1.1rem",
        zIndex: 1000,
        maxWidth: 180,
        textAlign: "center",
      }}
    >
      {formatTime(timeRemaining)}
    </Box>
  );
};

export default TimerInput;