import React from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";

const UserCard = () => {
  return (
    <Box
      sx={{
        top: "35px", 
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        mt: 2,
      }}
    >
      <Box
        sx={{
          width: 388,
          height: 177,
          bgcolor: "#000039",
          color: "#fff",
          borderRadius: "20px",
          p: 2,
          boxShadow: 3,
        }}
      >
        {/* Header - avatar + nombre */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            alt="Carlos Belcast"
            src="https://www.sdpnoticias.com/resizer/v2/RRPPNBJ33FC67GUBP5ZZUHGWLI.jpg?smart=true&auth=a78337d6179f738a790f5c4eeee41708be1b14db95a7a8de583937aa5aa4de60&width=640&height=360"
            sx={{ width: 60, height: 60 }}
          />
          <Typography variant="h6" fontWeight="bold">
            JairoPRo
          </Typography>
        </Box>

        {/* Info - estadísticas */}
        <Box display="flex" justifyContent="space-around" alignItems="center">
          {/* Trofeos */}
          <Box textAlign="center">
            <Typography variant="subtitle2">Trofeos</Typography>
            <Box fontSize="30px">🏆</Box>
            <Typography>890</Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ccc", mx: 2 }} />

          {/* Juegos */}
          <Box textAlign="center">
            <Typography variant="subtitle2">Juegos</Typography>
            <Box
              component="img"
              src="https://images.vexels.com/media/users/3/143289/isolated/preview/759a1d9598eae60232ca7a56b19f5a7d-figura-de-ajedrez-peon.png"
              alt="Pieza"
              sx={{ width: 30, height: 30, mb: 0.5 }}
            />
            <Typography>15</Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ccc", mx: 2 }} />

          {/* Rango */}
          <Box textAlign="center">
            <Typography variant="subtitle2">Rango</Typography>
            <Box fontSize="30px">🥇</Box>
            <Typography>Oro</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;