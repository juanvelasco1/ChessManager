import { Box, Typography, Avatar } from "@mui/material";

const GameCard = ({ pair }) => {
  const [player1, player2] = pair || {};

  return (
    <Box
      sx={{
        border: "1.5px solid #000039",
        bgcolor: "white",
        color: "#000039",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        borderRadius: "10px",
        mb: 1,
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar src={player1?.avatar || "/default-avatar.png"} sx={{ width: 30, height: 30 }} />
        <Typography fontWeight="medium">{player1?.nickname || "Jugador 1"}</Typography>
      </Box>
      <Typography fontWeight="bold" color="#000039">
        VS
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar src={player2?.avatar || "/default-avatar.png"} sx={{ width: 30, height: 30 }} />
        <Typography fontWeight="medium">{player2?.nickname || "Jugador 2"}</Typography>
      </Box>
    </Box>
  );
};

export default GameCard;