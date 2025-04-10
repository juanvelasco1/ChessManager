import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserLobby from "../../components/UserLobby/UserLobby";
import { useNavigate } from "react-router-dom";

const participants = [
  { name: "JairoPRo", avatar: "https://pbs.twimg.com/profile_images/905604271537889281/gP0urOKd_400x400.jpg" },
  { name: "Pedro", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
  { name: "Lucas", avatar: "https://randomuser.me/api/portraits/men/30.jpg" },
  { name: "Arcos", avatar: "https://randomuser.me/api/portraits/men/90.jpg" },
  { name: "Dama34", avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
  { name: "Peón", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Boss", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "ReyDama", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
];

const LobbyScreen = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 410, mx: "auto", mt: 8, textAlign: "center", position: "relative" }}>
      {/* Flecha de retroceso */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: -30,
          left: 0,
          zIndex: 1000,
          color: "#000039",
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 28 }} />
      </IconButton>

      {/* Título */}
      <Typography fontWeight="bold" color="#000039" fontSize="40px" mb={2}>
        Todos vs todos
      </Typography>

      {/* QR */}
      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
        alt="QR"
        sx={{
          borderRadius: "6px",
          width: 207,
          height: 207,
          mx: "auto",
          mb: 2,
        }}
      />

      {/* Contador de participantes */}
      <Typography fontWeight="bold" color="#000000" fontSize="40px">
        {participants.length}
      </Typography>
      <Typography fontWeight="bold" color="#000039" fontSize="24px" mb={2}>
        Participantes
      </Typography>

      {/* Grid de Participantes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          justifyItems: "center",
          mb: 4,
        }}
      >
        {participants.map((user, index) => (
          <UserLobby key={index} name={user.name} avatar={user.avatar} />
        ))}
      </Box>

      {/* Botón Iniciar */}
      <Button
        variant="contained"
        onClick={() => navigate("/game-tournament")}
        sx={{
          backgroundColor: "#000039",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          width: "93%",
          height: "63px",
          py: 1.2,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#000039",
          },
        }}
      >
        INICIAR
      </Button>
    </Box>
  );
};

export default LobbyScreen;