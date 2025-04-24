import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };