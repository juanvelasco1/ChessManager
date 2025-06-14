import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../../services/firebaseConfig";
import { doc, getDoc, setDoc, getDocs, collection, updateDoc } from "firebase/firestore";


const TimerInput = ({ topMobileAdmin = "62%", topPcAdmin = "340px", topMobileUser = "30%", topPcUser = "200px", role = "user" }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [dateStart, setDateStart] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Obtiene la fecha de inicio desde Firestore
  useEffect(() => {
    const fetchStartDate = async () => {
      const timerDocRef = doc(db, "configuracionGlobal", "timerHome");
      const docSnapshot = await getDoc(timerDocRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setDateStart(new Date(data.dateStart.toDate()));
      } else {
        console.error("El documento ");
      }
    };

    fetchStartDate();
  }, []);

  useEffect(() => {
    if (!dateStart) return;

    const interval = setInterval(() => {
      const currentlyDate = new Date();
      const timeRemaining = 15 * 24 * 60 * 60 * 1000 - (currentlyDate.getTime() - dateStart.getTime());
      setTimeRemaining(timeRemaining);
      if (timeRemaining <= 0) {
        clearInterval(interval);
        restartPointsAndRanking();
        setTimeRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dateStart]);

  // Reinicia puntos y ranking al terminar los 15 días
  const restartPointsAndRanking = async () => {
    try {
      const usuariosRef = collection(db, "usuarios");
      const querySnapshot = await getDocs(usuariosRef);
      for (const docSnap of querySnapshot.docs) {
        await updateDoc(docSnap.ref, {
          score: 0,
          rank: 0,
        });
      }

      const timerDocRef = doc(db, "configuracionGlobal", "timerHome");
      const now = new Date();
      await setDoc(timerDocRef, { dateStart: now });
      setDateStart(now);
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
        position: "absolute",
        top: isMobile
          ? (role === "admin" ? topMobileAdmin : topMobileUser)
          : (role === "admin" ? topPcAdmin : topPcUser),
        right: 0,
        transform: "none",
        bgcolor: "#000039",
        color: "white",
        px: 2,
        py: 1.2,
        borderTopLeftRadius: "25px",
        borderBottomLeftRadius: "25px",
        boxShadow: 3,
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: "0.9rem",
        maxWidth: 140,
        textAlign: "center",
      }}
    >
      {formatTime(timeRemaining)}
    </Box>
  );
};

export default TimerInput;