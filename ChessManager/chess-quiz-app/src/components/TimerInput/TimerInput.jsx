import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const TimerInput = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 24 * 60 * 60); // 15 días en segundos

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) return 15 * 24 * 60 * 60;
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    return `${days}d-${hours}h-${minutes}m`;
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "32%",
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
        fontSize: "1.2rem",
      }}
    >
      {formatTime(timeLeft)}
    </Box>
  );
};

export default TimerInput;