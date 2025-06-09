import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

/**
 * Actualiza los puntos de un jugador en Firebase y Redux.
 * @param {Object} player - Datos del jugador (uid, nickname, etc.).
 * @param {number} points - Puntos a sumar o restar.
 * @param {Function} updatePointsInRedux - Función para actualizar puntos en Redux.
 */
export const updatePlayerPoints = async (player, points, updatePointsInRedux) => {
  try {
    // Actualizar puntos en Firebase
    const userRef = doc(db, "users", player.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const currentPoints = userData.points || 0;
      const updatedPoints = currentPoints + points;

      await updateDoc(userRef, {
        points: updatedPoints,
      });

      console.log(`Puntos actualizados en Firebase para ${player.nickname}: ${updatedPoints}`);
    } else {
      console.error(`El usuario con UID ${player.uid} no existe en Firebase.`);
    }

    // Actualizar puntos en Redux
    updatePointsInRedux(player.uid, points);
  } catch (error) {
    console.error("Error al actualizar puntos:", error);
  }
};