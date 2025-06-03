import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Divider, Modal, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";

const UserCard = () => {
  const uid = useSelector((state) => state.auth.uid);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para controlar el Snackbar
  const navigate = useNavigate();

  // Actualizar campos del usuario si no existen
  const updateUserFields = async () => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        // Inicializar valores si no existen
        if (!userData.trophies || !userData.games || !userData.rank) {
          await updateDoc(userDocRef, {
            trophies: userData.trophies || 0, // Inicializa trofeos en 0
            games: userData.games || 0, // Inicializa juegos en 0
            rank: userData.rank || 0, // Inicializa rango en 0
          });
          console.log("Campos inicializados correctamente.");
        }
      }
    } catch (error) {
      console.error("Error al actualizar los campos:", error);
    }
  };

  // Sincronizar datos del usuario en tiempo real
  useEffect(() => {
    if (uid) {
      updateUserFields(); // Inicializar campos si es necesario

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

  // Manejar cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSnackbarOpen(true); // Muestra el Snackbar
      setTimeout(() => {
        navigate("/login"); // Redirige al login después de un tiempo
      }, 2000); // Espera 2 segundos antes de redirigir
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  // Cierra el Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!user) {
    return <Typography>Cargando datos del usuario...</Typography>;
  }

  // Obtener imagen y texto del rango en base al puntaje del quiz
  const getRankImage = (score) => {
    if (score >= 90) return "🥇"; // Oro
    if (score >= 60) return "🥈"; // Plata
    if (score >= 30) return "🏵️"; // Bronce
    return "🪵"; // Madera
  };

  const getRankText = (score) => {
    if (score >= 90) return "Oro";
    if (score >= 60) return "Plata";
    if (score >= 30) return "Bronce";
    return "Madera";
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
        top: { xs: -21, md: 105 },
        mx: "auto",
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
        onClose={() => setOpenModal(false)} // Cierra el modal
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
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            fontFamily: "Roboto",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            mb={2}
            sx={{ color: "#000039", fontWeight: "700" }}
          >
            ¿Cerrar sesión?
          </Typography>
          <Typography id="modal-description" mb={3} sx={{ color: "#000039" }}>
            ¿Estás seguro de que deseas cerrar sesión?
          </Typography>
          <Box display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "#FF4D4F",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#d9373a",
                },
              }}
            >
              Sí, salir
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              sx={{
                color: "#000039",
                borderColor: "#000039",
                fontWeight: "bold",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  borderColor: "#000039",
                },
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar de confirmación */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Duración de 3 segundos
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          ¡Sesión cerrada exitosamente!
        </Alert>
      </Snackbar>

      {/* Header - avatar + nombre */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar
          src={user.avatar || "/avatars/default-avatar.png"} // Usa el avatar del usuario o una imagen predeterminada
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
          <Box fontSize="30px">{getRankImage(user.quizScore)}</Box>
          <Typography variant="body2" fontWeight="regular">
            {getRankText(user.quizScore)}
          </Typography>
        </Box>
      </Box>

      {/* Botón para escanear QR */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate("/qr-scanner")} // Redirige al escáner de QR
          sx={{
            bgcolor: "#000039",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#000039",
            },
          }}
        >
          Escanear QR
        </Button>
      </Box>
    </Box>
  );
};

export default UserCard;