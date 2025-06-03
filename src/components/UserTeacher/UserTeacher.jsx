import { Box, Avatar, Typography, Modal, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const UserTeacher = () => {
  const uid = useSelector((state) => state.auth.uid);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          top: isMobile ? -18 : 10,
          mx: isMobile ? "auto" : 0,
          left: isMobile ? 0 : 102,
        }}
      >
        {/* Botón de cierre de sesión */}
        <Box
          onClick={() => setOpenModal(true)} // Abre el modal al hacer clic
          sx={{
            position: "absolute",
            top: 30,
            right: 30,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26px"
            height="26px"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.34 8.17c-.93 0-1.69-.77-1.69-1.7a1.69 1.69 0 0 1 1.69-1.69c.94 0 1.7.76 1.7 1.69s-.76 1.7-1.7 1.7M10.3 19.93l-5.93-1.18l.34-1.7l4.15.85l1.35-6.86l-1.52.6v2.86H7v-3.96l4.4-1.87l.67-.08c.6 0 1.1.34 1.43.85l.86 1.35c.68 1.21 2.03 2.03 3.64 2.03v1.68c-1.86 0-3.56-.83-4.66-2.1l-.5 2.54l1.77 1.69V23h-1.69v-5.1l-1.78-1.69zM21 23h-2V3H6v13.11l-2-.42V1h17zM6 23H4v-3.22l2 .42z" />
          </svg>
        </Box>

        {/* Modal de confirmación */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              p: 4,
              textAlign: "center",
              fontFamily: "Roboto",
            }}
          >
            <Typography
              id="modal-title"
              sx={{
                color: "#000039",
                fontFamily: "Roboto",
                fontSize: "22px",
                fontWeight: 700,
                mb: 2,
              }}
            >
              ¿Cerrar sesión?
            </Typography>
            <Typography
              id="modal-description"
              sx={{
                color: "#4f4f4f",
                fontFamily: "Roboto",
                fontSize: "16px",
                mb: 3,
              }}
            >
              ¿Estás seguro de que deseas cerrar sesión?
            </Typography>
            <Box display="flex" justifyContent="space-around">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: "Roboto",
                  "&:hover": {
                    backgroundColor: "#b71c1c",
                  },
                }}
                onClick={handleLogout}
              >
                Sí, salir
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#000039",
                  color: "#000039",
                  fontWeight: 600,
                  fontFamily: "Roboto",
                  "&:hover": {
                    borderColor: "#000039",
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Modal>

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
  );
};

export default UserTeacher;