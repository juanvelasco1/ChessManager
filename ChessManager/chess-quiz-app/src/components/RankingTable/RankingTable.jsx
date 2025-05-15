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
  const [rankingData, setRankingData] = useState([]);
  const currentUser = useSelector((state) => ({
    nickname: state.auth.nickname,
    points: state.auth.points,
    rank: state.auth.rank,
    avatar: state.auth.avatar || "https://via.placeholder.com/150",
  }));

  // Obtener datos de los usuarios desde Firestore
  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("rank", "asc")); // Ordenar por rank en orden ascendente
        const querySnapshot = await getDocs(q);

        const users = querySnapshot.docs.map((doc) => ({
          rank: doc.data().rank || 0,
          name: doc.data().nickname || "Sin nombre",
          points: doc.data().points || 0,
          avatar: doc.data().avatar || "https://via.placeholder.com/150",
        }));

        setRankingData(users.filter((user) => user.rank > 3));
      } catch (error) {
        console.error("Error al obtener los datos del ranking:", error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <Box
      sx={{
        width: { xs: 412, md: "500px" },
        mx: "auto",
        mt: { xs: 3, md: -17 },
        top: { xs: 40, md: 0 },
        position: { xs: "relative", md: "relative" },
      }}
    >
      <Typography
        sx={{
          width: "fit-content",
          mt: { xs: -4, md: -1 },
          mb: 1,
          p: 1.5,
          textAlign: "center",
          fontWeight: 900,
          fontSize: "37px",
          color: "#000039",
          mx: "auto",
        }}
      >
        Tabla de puntos
      </Typography>

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
          maxHeight: { xs: 230, md: 400 },
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
            <Typography fontWeight="bold">#{currentUser.rank}</Typography>
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
