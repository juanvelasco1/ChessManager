import {
    Box,
    Typography,
    Avatar,
    ToggleButton,
    ToggleButtonGroup,
  } from "@mui/material";
  import { useState } from "react";
  
  const rankingData = [
    { rank: 4, name: "JairoNoPRo", points: 990, avatar: "https://robohash.org/1" },
    { rank: 5, name: "riki", points: 800, avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { rank: 6, name: "nikc", points: 789, avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { rank: 7, name: "camilo", points: 775, avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    { rank: 8, name: "alejo", points: 760, avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
    { rank: 21, name: "Yo", points: 890, avatar: "https://randomuser.me/api/portraits/men/3.jpg", isMe: true },
  ];
  
  const RankingTable = () => {
    const [mode, setMode] = useState("general");
  
    // Separar participantes del usuario actual
    const participants = rankingData.filter((user) => !user.isMe);
    const currentUser = rankingData.find((user) => user.isMe);
  
    return (
      <Box sx={{ width: 412, mx: "auto", mt: 3, top: 40, position: "relative" }}>
        {/* Selector */}
        <ToggleButtonGroup
          exclusive
          value={mode}
          onChange={(e, newMode) => newMode && setMode(newMode)}
          sx={{
            width: "100%",
            borderRadius: "12px",
            mb: 2,
            backgroundColor: "#e0e0e0",
            "& .MuiToggleButtonGroup-grouped": {
              minWidth: "50%",
              border: "none",
              borderRadius: "12px !important",
              paddingY: 1.5,
              fontWeight: "bold",
              fontSize: "16px",
              color: "rgba(0, 0, 57, 1)",
              transition: "all 0.3s ease-in-out",
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "rgba(0, 0, 57, 1)",
                color: "#fff",
              },
            },
          }}
        >
          <ToggleButton value="general">General</ToggleButton>
          <ToggleButton value="1vs1">1vs1</ToggleButton>
        </ToggleButtonGroup>
  
        {/* Encabezado fijo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            mb: 1,
          }}
        >
          <Typography fontWeight="bold" color="#000039">
            Top
          </Typography>
          <Typography fontWeight="bold" color="#000039">
            Jugador
          </Typography>
          <Typography fontWeight="bold" color="#000039">
            Puntos
          </Typography>
        </Box>
  
        {/* Participantes scrollables */}
        <Box
          sx={{
            maxHeight: 230,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {participants.map((user) => (
            <Box
              key={user.rank}
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
              <Typography fontWeight="bold">#{user.rank}</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar src={user.avatar} sx={{ width: 30, height: 30 }} />
                <Typography fontWeight="medium">{user.name}</Typography>
              </Box>
              <Typography fontWeight="medium">{user.points}</Typography>
            </Box>
          ))}
        </Box>
  
        {/* Usuario actual fijo al final */}
        {currentUser && (
          <Box
            sx={{
              border: "none",
              bgcolor: "#000039",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1,
              borderRadius: "10px",
              mt: 1,
            }}
          >
            <Typography fontWeight="bold">#{currentUser.rank}</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src={currentUser.avatar} sx={{ width: 30, height: 30 }} />
              <Typography fontWeight="medium">{currentUser.name}</Typography>
            </Box>
            <Typography fontWeight="medium">{currentUser.points}</Typography>
          </Box>
        )}
      </Box>
    );
  };
  
  export default RankingTable;
