import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, doc, getDoc, collection, getDocs, updateDoc, addDoc, setDoc, Firestore, onSnapshot, arrayUnion, arrayRemove } from "firebase/firestore";
import { Auth, browserLocalPersistence, createUserWithEmailAndPassword, EmailAuthProvider, getAuth, reauthenticateWithCredential, setPersistence, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB-h_Tb7pVKs0vHLCAwACxqzSDzhlsY3ig",
    authDomain: "chess-manager-58379.firebaseapp.com",
    projectId: "chess-manager-58379",
    storageBucket: "chess-manager-58379.firebasestorage.app",
    messagingSenderId: "660207613838",
    appId: "1:660207613838:web:7f69658303e443cb4c56df"
};

const db = Firestore | undefined;
export const auth = getAuth(app);

export const getFirebaseInstance = async () => {
    if(!db || !auth ) {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
    }
    return {db, auth};
};

export const getUsers = async (userId) => {
    const { db } = await getFirebaseInstance();
    const docRef = doc(db, "users", userId);
    const userData = await getDoc(docRef);

    return userData.exists() ? userData.data() : null;
};

export const loginUser = async (email, password) => {
    if(!email || !password) {
        alert("Email and password are required");
        return Promise.reject("Email and password are required");
    }
    
    const { auth } = await getFirebaseInstance();

    try {
        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return Promise.resolve(auth.currentUser?.uid);

    } catch (error) {
        console.error("Error signing in: ", error);
        return Promise.reject("Authentication failure, wrong credentials");
    }
};

export const logoutUser = async () => {
    try {
        const {auth} = await getFirebaseInstance();
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};

export const registerUser = async (credentials) => {
    try {
        const {auth, db} = await getFirebaseInstance();
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

        const where = doc(db, "users", userCredential.user.uid);
        const data = {
            nickname: credentials.nickname,
            email: credentials.email,
            password: credentials.password
        };

        await setDoc(where,data);
        return true;
    } catch (error) {
        if(!credentials.email || !credentials.password)
        console.error("Error registering user: ", error);
    return false;
    }
};