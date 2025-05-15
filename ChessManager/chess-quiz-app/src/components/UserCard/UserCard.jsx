import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, onSnapshot, updateDoc, getDoc, collection, getDocs, query, orderBy } from "firebase/firestore";

const UserCard = () => {
  const uid = useSelector((state) => state.auth.uid);
  const [user, setUser] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const navigate = useNavigate();

  const updateUserFields = async () => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (!userData.trophies || !userData.games || !userData.rank) {
          await updateDoc(userDocRef, {
            trophies: userData.trophies || 0,
            games: userData.games || 0,
            rank: userData.rank || 0,
          });
          console.log("Campos actualizados correctamente.");
        }
      }
    } catch (error) {
      console.error("Error al actualizar los campos:", error);
    }
  };

  useEffect(() => {
    if (uid) {
      updateUserFields();
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data());
        } else {
          console.log("No se encontró el documento del usuario.");
        }
      });

      return () => unsubscribe();
    }
  }, [uid]);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("rank", "asc"));
      const querySnapshot = await getDocs(q);

      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nickname: doc.data().nickname || "Jugador",
        rank: doc.data().rank || 0
      }));

      setTopPlayers(users.slice(0, 3));
    };

    fetchTopPlayers();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Sesión cerrada exitosamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  if (!user) {
    return <Typography>Cargando datos del usuario...</Typography>;
  }

  const getRankImage = (rank) => {
    if (rank >= 90) return "🥇"; // Oro
    if (rank >= 60) return "🥈"; // Plata
    if (rank >= 30) return "🏵️"; // Bronce
    return "🪵"; // Madera
  };

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
        onClick={handleLogout}
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
          src={user.avatar || "https://via.placeholder.com/150"}
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
          <Typography>{user.trophies || 0}</Typography>
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
          <Typography>{user.games || 0}</Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ccc", mx: 2 }} />

        {/* Rango */}
        <Box textAlign="center">
          <Typography variant="subtitle2">Rango</Typography>
          <Box fontSize="30px">
            {getRankImage(user.rank)}
          </Box>
          <Typography>{user.rank || 0}</Typography>
        </Box>
      </Box>

      {/* Podio */}
      <Box display="flex" justifyContent="center" mt={3} gap={4}>
        {topPlayers.map((player) => (
          <Box key={player.id} textAlign="center" sx={{ width: 100 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {player.nickname}
            </Typography>
            <Typography variant="h6">{player.rank}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserCard;