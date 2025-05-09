import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const UserCard = ({ uid }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const ref = doc(db, 'users', uid);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) setUser(snapshot.data());
    };
    fetchUser();
  }, [uid]);

  if (!user) return <div>Cargando...</div>;

  return (
    <Box
      sx={{
        width: 388,
        height: 177,
        bgcolor: "#000039",
        color: "#fff",
        borderRadius: "20px",
        p: 2,
        mt: 2,
        boxShadow: 3,
        position: "relative",
        top: 40,
        mx: "auto",
      }}
    >
      {/* SVG */}
      <Box
        onClick={() => navigate("/login")}
        sx={{
          position: "absolute",
          top: 30,
          right: 30,
          color: "#fff",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26px"
          height="26px"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M13.34 8.17c-.93 0-1.69-.77-1.69-1.7a1.69 1.69 0 0 1 1.69-1.69c.94 0 1.7.76 1.7 1.69s-.76 1.7-1.7 1.7M10.3 19.93l-5.93-1.18l.34-1.7l4.15.85l1.35-6.86l-1.52.6v2.86H7v-3.96l4.4-1.87l.67-.08c.6 0 1.1.34 1.43.85l.86 1.35c.68 1.21 2.03 2.03 3.64 2.03v1.68c-1.86 0-3.56-.83-4.66-2.1l-.5 2.54l1.77 1.69V23h-1.69v-5.1l-1.78-1.69zM21 23h-2V3H6v13.11l-2-.42V1h17zM6 23H4v-3.22l2 .42z"/>
        </svg>
      </Box>

      {/* Header - avatar + nombre */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar
          alt="Carlos Belcast"
          src="https://www.sdpnoticias.com/resizer/v2/RRPPNBJ33FC67GUBP5ZZUHGWLI.jpg?smart=true&auth=a78337d6179f738a790f5c4eeee41708be1b14db95a7a8de583937aa5aa4de60&width=640&height=360"
          sx={{ width: 60, height: 60 }}
        />
        <Typography variant="h6" fontWeight="bold">
          {user.nickname || "Usuario"}
        </Typography>
      </Box>

      {/* Info - estadísticas */}
      <Box display="flex" justifyContent="space-around" alignItems="center">
        {/* Trofeos */}
        <Box textAlign="center">
          <Typography variant="subtitle2">Trofeos</Typography>
          <Box fontSize="30px">🏆</Box>
          <Typography>{user.trophies}</Typography>
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
          <Typography>{user.games}</Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ccc", mx: 2 }} />

        {/* Rango */}
        <Box textAlign="center">
          <Typography variant="subtitle2">Rango</Typography>
          <Box fontSize="30px">🥇</Box>
          <Typography>{user.rank}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;