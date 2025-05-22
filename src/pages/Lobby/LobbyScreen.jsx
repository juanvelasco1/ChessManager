import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserLobby from "../../components/UserLobby/UserLobby";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <Box sx={{ width: 410, margin: 0, padding: 0, mt: 8, textAlign: "center", position: "relative" }}>
      {/* Flecha de retroceso */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 999,
          color: "#000039",
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 28 }} />
      </IconButton>

      <Typography fontWeight="bold" color="#000039" fontSize="40px" mb={2}>
        Todos vs todos
      </Typography>

      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
        alt="QR"
        sx={{
          borderRadius: "6px",
          width: 207,
          height: 207,
          margin: 0,
          padding: 0,
          mb: 2,
        }}
      />

      <Typography fontWeight="bold" color="#000000" fontSize="40px">
        {participants.length}
      </Typography>
      <Typography fontWeight="bold" color="#000039" fontSize="24px" mb={2}>
        Participantes
      </Typography>

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
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 999,
          color: "#000039",
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 28 }} />
      </IconButton>

      <Typography fontWeight="bold" color="#000039" fontSize="40px" mb={2}>
        Todos vs todos
      </Typography>

      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
        alt="QR"
        sx={{
          borderRadius: "6px",
          width: 230,
          height: 230,
          margin: 0,
          padding: 0,
          mb: 2,
        }}
      />

      <Typography fontWeight="bold" color="#000000" fontSize="40px">
        {participants.length}
      </Typography>
      <Typography fontWeight="bold" color="#000039" fontSize="24px" mb={2}>
        Participantes
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          justifyItems: "center",
          mb: 4,
        }}
      >
        {participants.map((user, index) => (
          <UserLobby key={index} name={user.name} avatar={user.avatar} />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={() => navigate("/game-tournament")}
        sx={{
          backgroundColor: "#000039",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          width: "230px",
          height: "60px",
          color: "#fff",
          mt: 2,
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