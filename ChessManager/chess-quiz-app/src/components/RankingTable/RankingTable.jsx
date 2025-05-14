import {
  Box,
  Typography,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const RankingTable = ({ showCurrentUser = false }) => {
  const [mode, setMode] = useState("general");
  const [rankingData, setRankingData] = useState([]);
  const currentUser = useSelector((state) => ({
    nickname: state.auth.nickname,
    points: 500, // Puedes reemplazar esto con el puntaje real del usuario
    avatar: "https://via.placeholder.com/150", // Puedes reemplazar esto con el avatar real del usuario
  }));

  // Obtener datos de los usuarios desde Firestore
  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("points", "desc")); // Ordenar por puntos en orden descendente
        const querySnapshot = await getDocs(q);

        const users = querySnapshot.docs.map((doc, index) => ({
          rank: index + 1,
          name: doc.data().nickname || "Sin nombre",
          points: doc.data().points || 0,
          avatar: doc.data().avatar || "https://via.placeholder.com/150",
        }));

        setRankingData(users);
      } catch (error) {
        console.error("Error al obtener los datos del ranking:", error);
      }
    };

    fetchRankingData();
  }, []);

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
        {rankingData.map((user) => (
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

        {/* Usuario actual (solo si showCurrentUser es true) */}
        {showCurrentUser && (
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
              mt: 2,
            }}
          >
            <Typography fontWeight="bold">-</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src={currentUser.avatar} sx={{ width: 30, height: 30 }} />
              <Typography fontWeight="medium">{currentUser.nickname}</Typography>
            </Box>
            <Typography fontWeight="medium">{currentUser.points}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RankingTable;
