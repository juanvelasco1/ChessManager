import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const GameTournamentScreen = () => {
  const { roomId } = useParams();
  const userRole = useSelector((state) => state.auth.rol);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const roomData = docSnapshot.data();
        setPairs(roomData.pairs || []);
      }
    });
    return () => unsubscribe();
  }, [roomId]);

  const handleGivePoint = async (playerId) => {
    try {
      const updatedPairs = pairs.map((pair) => {
        const newPair = { ...pair };
        if (newPair.player1 && newPair.player1.uid === playerId) {
          newPair.player1 = {
            ...newPair.player1,
            points: (newPair.player1.points || 0) + 1,
          };
        }
        if (newPair.player2 && newPair.player2.uid === playerId) {
          newPair.player2 = {
            ...newPair.player2,
            points: (newPair.player2.points || 0) + 1,
          };
        }
        return newPair;
      });

      const roomRef = doc(db, "rooms", roomId);
      await updateDoc(roomRef, { pairs: updatedPairs });
    } catch (error) {
      console.error("Error updating points:", error);
      alert("Error al asignar punto. Inténtalo de nuevo.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {pairs.map((pair, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h6" component="div" sx={{ display: "inline-block", mr: 1 }}>
            {pair.player1?.nickname} ({pair.player1?.points || 0})
          </Typography>
          {userRole === "profesor" && (
            <Button variant="contained" size="small" onClick={() => handleGivePoint(pair.player1.uid)} sx={{ mr: 2 }}>
              +1
            </Button>
          )}
          {pair.player2 && (
            <>
              <Typography variant="h6" component="div" sx={{ display: "inline-block", mr: 1 }}>
                {pair.player2.nickname} ({pair.player2.points || 0})
              </Typography>
              {userRole === "profesor" && (
                <Button variant="contained" size="small" onClick={() => handleGivePoint(pair.player2.uid)}>
                  +1
                </Button>
              )}
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default GameTournamentScreen;