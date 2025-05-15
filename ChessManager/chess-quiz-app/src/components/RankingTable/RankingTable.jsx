import {
  Box,
  Typography,
  Avatar
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const RankingTable = ({ showCurrentUser = false }) => {
  const [rankingData, setRankingData] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    uid: "",
    nickname: "",
    points: 0,
    avatar: "ChessManager/chess-quiz-app/public/avatars/default.jpg",
    rank: "N/A",
  });

  // Dividir el selector en múltiples llamadas
  const uid = useSelector((state) => state.auth.uid);

  // Obtener datos de los usuarios desde Firestore
  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("points", "desc")); // Ordenar por puntos en orden descendente
        const querySnapshot = await getDocs(q);

        const users = querySnapshot.docs.map((doc, index) => ({
          uid: doc.id, // Usar el ID del documento como identificador único
          rank: index + 4, // El top inicia en la posición 4
          name: doc.data().nickname || "Sin nombre",
          points: doc.data().points || 0,
          avatar: doc.data().avatar || "ChessManager/chess-quiz-app/public/avatars/default.jpg",
        }));

        setRankingData(users);
      } catch (error) {
        console.error("Error al obtener los datos del ranking:", error);
      }
    };

    fetchRankingData();
  }, []);

  // Sincronizar datos del usuario actual y calcular su rango
  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);

      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();

          // Calcular el rango del usuario actual basado en rankingData
          const userRank = rankingData.findIndex((user) => user.uid === uid);
          const calculatedRank = userRank !== -1 ? userRank + 4 : "N/A"; // Sumar 4 si el usuario está en la lista

          setCurrentUser({
            uid: uid,
            nickname: userData.nickname || "Sin nombre",
            points: userData.points || 0,
            avatar: userData.avatar || "ChessManager/chess-quiz-app/public/avatars/default.jpg",
            rank: calculatedRank,
          });
        }
      });

      return () => unsubscribe();
    }
  }, [uid, rankingData]); // Dependemos de rankingData para calcular el rango dinámicamente

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
              <Avatar src={user.avatar || "ChessManager/chess-quiz-app/public/avatars/default.jpg"} sx={{ width: 30, height: 30 }} />
              <Typography fontWeight="medium">{user.name}</Typography>
            </Box>
            <Typography fontWeight="medium">{user.points}</Typography>
          </Box>
        ))}

        {/* Usuario actual (fijado visualmente) */}
        {showCurrentUser && currentUser.rank && (
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
