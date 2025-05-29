import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

/**
 * Crea una sala en Firebase.
 * @param {string} teacherUid - UID del profesor que crea la sala.
 * @returns {Promise<string>} - ID de la sala creada.
 */
export const createRoom = async (teacherUid) => {
  try {
    const roomRef = await addDoc(collection(db, "rooms"), {
      participants: [], // Lista vacía de participantes al inicio
      createdBy: teacherUid, // UID del profesor
      isActive: true, // Indica que la sala está activa
      createdAt: serverTimestamp(), // Marca de tiempo de creación
    });

    return roomRef.id; // Retorna el ID de la sala creada
  } catch (error) {
    console.error("Error creando la sala:", error);
    throw error;
  }
};