import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

/**
 * Fetches and processes ranking data from Firestore.
 * @returns {Promise<{ podium: Array, ranking: Array }>} An object containing podium and ranking data.
 */
export const fetchRankingData = async () => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("points", "desc")); // Order by points descending
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc, index) => ({
      uid: doc.id,
      nickname: doc.data().nickname || "Sin nombre",
      points: doc.data().points || 0,
      avatar: doc.data().avatar || "ChessManager/chess-quiz-app/public/avatars/default.jpg",
      rank: index + 1, // Rank starts at 1
    }));

    // Separate podium (top 3) and ranking (4th and below)
    const podium = users.slice(0, 3);
    const ranking = users.slice(3);

    return { podium, ranking };
  } catch (error) {
    console.error("Error fetching ranking data:", error);
    return { podium: [], ranking: [] };
  }
};