import { Box, Typography, Avatar, Button } from "@mui/material";
import { useState } from "react";

const GameCard = () => {
  const [result, setResult] = useState(null); // null, "left", "right", "draw"

  const getColors = () => {
    switch (result) {
      case "left":
        return ["#8BC34A", "#434379", "#D32F2F"];
      case "right":
        return ["#D32F2F", "#434379", "#8BC34A"];
      case "draw":
        return ["#9E9E9E", "#434379", "#9E9E9E"];
      default:
        return ["#434379", "#434379", "#434379"];
    }
  };

  const getPoints = () => {
    if (result === "left") return ["1", "Empate", "0"];
    if (result === "right") return ["0", "Empate", "1"];
    if (result === "draw") return ["0.5", "Empate", "0.5"];
    return ["Ganador", "Empate", "Ganador"];
  };

  const [leftColor, middleColor, rightColor] = getColors();
  const [leftText, middleText, rightText] = getPoints();

  return (
    <Box
      sx={{
        width: 410,
        mx: "auto",
        height: 195,
        borderRadius: "12px",
        boxShadow: 2,
        overflow: "hidden",
        mb: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Jugadores */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000039",
          color: "#fff",
          py: 1.5,
          px: 2,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/701/701967.png"
            sx={{ width: 40, height: 40, mb: 0.5 }}
          />
          <Typography fontSize={14} fontWeight="bold">
            Lucas
          </Typography>
        </Box>

        <Typography fontWeight="bold" fontSize={18}>
          Vs
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            sx={{ width: 40, height: 40, mb: 0.5 }}
          />
          <Typography fontSize={14} fontWeight="bold">
            JairoPro
          </Typography>
        </Box>
      </Box>

      {/* Botones */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          flexGrow: 1,
        }}
      >
        <Button
          onClick={() => setResult("left")}
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            fontSize: 16,
            backgroundColor: leftColor,
            color: "#fff",
            borderRight: "1px solid white",
            height: "100%",
            "&:hover": { backgroundColor: leftColor },
          }}
        >
          {leftText}
        </Button>

        <Button
          onClick={() => setResult("draw")}
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            fontSize: 16,
            backgroundColor: middleColor,
            color: "#fff",
            height: "100%",
            "&:hover": { backgroundColor: middleColor },
          }}
        >
          {middleText}
        </Button>

        <Button
          onClick={() => setResult("right")}
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            fontSize: 16,
            backgroundColor: rightColor,
            color: "#fff",
            borderLeft: "1px solid white",
            height: "100%",
            "&:hover": { backgroundColor: rightColor },
          }}
        >
          {rightText}
        </Button>
      </Box>
    </Box>
  );
};

export default GameCard;