import GameCard from "../../components/GameCard/GameCard";
import { Box, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const GameTournamentScreen = () => {
  const navigate = useNavigate();

  const scrollHeight = 800; 

  return (
    
    <Box
      sx={{
        width: 410,
        mx: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        pt: 3,
      }}
    >
      {/* Título */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#000039"
        textAlign="center"
        mb={2}
      >
        Todos vs todos
      </Typography>
      <IconButton
  onClick={() => navigate(-1)}
  sx={{
    position: "absolute",
    top: 35,
    left: 16,
    zIndex: 999,
    color: "#000039",
  }}
>
  <ArrowBackIcon />
</IconButton>

      {/* Scroll de tarjetas */}
      <Box
        sx={{
          maxHeight: scrollHeight,
          overflowY: "auto",
          pr: 1,
        }}
      >
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </Box>
    </Box>
    
  );
};

export default GameTournamentScreen;