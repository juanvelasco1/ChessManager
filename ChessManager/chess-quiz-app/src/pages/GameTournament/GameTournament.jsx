import GameCard from "../../components/GameCard/GameCard";
import { Box, Typography } from "@mui/material";

const GameTournamentScreen = () => {

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