import { Box, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchRankingData } from "../../utils/rankingUtils";

const RankingTable = ({ showCurrentUser = false }) => {
  const [rankingData, setRankingData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const uid = useSelector((state) => state.auth.uid);

  useEffect(() => {
    const fetchData = async () => {
      const { ranking } = await fetchRankingData();
      setRankingData(ranking);

      if (uid) {
        const user = ranking.find((user) => user.uid === uid);
        setCurrentUser(user || null);
      }
    };

    fetchData();
  }, [uid]);

  return (
    <Box
      sx={{
        width: { xs: 412, md: "500px" },
        mx: "auto",
        mt: { xs: -4, md: -17 },
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
          position: "relative", // Necesario para que sticky funcione
        }}
      >
        {rankingData.map((user) => (
          <Box
            key={user.uid} // Usar uid como clave única
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
              <Typography fontWeight="medium">{user.nickname}</Typography>
            </Box>
            <Typography fontWeight="medium">{user.points}</Typography>
          </Box>
        ))}

        {/* Usuario actual (fijado visualmente) */}
        {showCurrentUser && currentUser && (
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
              position: "sticky", // Hace que el elemento se quede fijo
              bottom: 0, // Fijado en la parte inferior del contenedor
              zIndex: 1, // Asegura que esté por encima de otros elementos
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
