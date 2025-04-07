import { Box } from "@mui/material";
import { useState, useEffect } from "react";

const TimerInput = ({ top = "50%" }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 24 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 15 * 24 * 60 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const d = Math.floor(s / (24 * 60 * 60));
    const h = Math.floor((s % (24 * 60 * 60)) / (60 * 60));
    const m = Math.floor((s % (60 * 60)) / 60);
    return `${d}d-${h}h-${m}m`;
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
      {formatTime(timeLeft)}
    </Box>
  );
};

export default TimerInput;