import { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { fetchRankingData } from "../../utils/rankingUtils";

const Podium = () => {
  const [podiumData, setPodiumData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { podium } = await fetchRankingData();
      setPodiumData(podium);
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        top: { xs: "38px", md: "110px" },
        width: 415,
        mx: "auto",
        mt: "100px",
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      {/* Número #2 */}
      <Typography
        sx={{
          color: "#000039",
          position: "absolute",
          top: "-48px", // altura ajustada para 10px sobre columna
          left: 30,
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        #2
      </Typography>

      {/* Número #1 */}
      <Typography
        sx={{
          color: "#000039",
          position: "absolute",
          top: "-68px", // más alto por ser la columna central
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        #1
      </Typography>

      {/* Número #3 */}
      <Typography
        sx={{
          color: "#000039",
          position: "absolute",
          top: "-28px",
          right: 30,
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        #3
      </Typography>

      {/* Segundo lugar */}
      <Box
        sx={{
          width: 138,
          height: 130,
          backgroundColor: "#2f2f77",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "#ffffff",
          pb: 1,
        }}
      >
        <Avatar
          src={podiumData[1]?.avatar || "/default-avatar.png"} // Cambia el enlace por una imagen local
          sx={{ width: 50, height: 50, mb: 1 }}
        />
        <Typography fontSize={14}>
          {podiumData[1]?.nickname || "-"}
        </Typography>
        <Typography fontSize={14}>
          {podiumData[1]?.points ?? 0}
        </Typography>
      </Box>

      {/* Primer lugar */}
      <Box
        sx={{
          width: 139,
          height: 160,
          backgroundColor: "#000039",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "#ffffff",
          pb: 1,
        }}
      >
        <Avatar
          src={podiumData[0]?.avatar || "https://via.placeholder.com/150"}
          sx={{ width: 60, height: 60, mb: 1 }}
        />
        <Typography fontSize={14}>
          {podiumData[0]?.nickname || "-"}
        </Typography>
        <Typography fontSize={14}>
          {podiumData[0]?.points ?? 0}
        </Typography>
      </Box>

      {/* Tercer lugar */}
      <Box
        sx={{
          width: 138,
          height: 110,
          backgroundColor: "#434379",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "#ffffff",
          pb: 1,
        }}
      >
        <Avatar
          src={podiumData[2]?.avatar || "https://via.placeholder.com/150"}
          sx={{ width: 50, height: 50, mb: 1 }}
        />
        <Typography fontSize={14}>
          {podiumData[2]?.nickname || "-"}
        </Typography>
        <Typography fontSize={14}>
          {podiumData[2]?.points ?? 0}
        </Typography>
      </Box>
    </Box>
  );
};

export default Podium;