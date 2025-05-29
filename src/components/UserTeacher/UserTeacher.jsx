import { Box, Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";


const UserTeacher = () => {
    const uid = useSelector((state) => state.auth.uid);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (!uid) return;
  
      const userDocRef = doc(db, "users", uid);
  
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data());
        } else {
          console.error("El documento del usuario no existe.");
        }
      });
  
      return () => unsubscribe();
    }, [uid]);

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

    return (
        <>
    <Box
      sx={{
        width: 388,
        height: 62,
        bgcolor: "#000039",
        color: "#fff",
        borderRadius: "20px",
        p: 2,
        mt: 2,
        boxShadow: 3,
        position: "relative",
        top: 10,
        mx: "auto",
      }}
    >
      {/* SVG */}
      <Box
        coursor="pointer"
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
          alt={user.nickname || "Usuario"}
          src={user.avatar || "/avatars/default-avatar.png"} // Usa el avatar del usuario o una imagen predeterminada
          sx={{ width: 60, height: 60 }}
        />
        <Typography variant="h6" fontWeight="bold">
          {user.nickname || "Usuario"}
        </Typography>
      </Box>
      </Box>
        </>
    )
};

export default UserTeacher;