import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const QRScanner = () => {
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const [cameraError, setCameraError] = useState(null); // Estado para manejar errores de cámara
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener datos directamente desde localStorage
  const uid = localStorage.getItem("uid");
  const nickname = localStorage.getItem("nickname") || "Anónimo"; // Valor predeterminado si no existe
  const avatar = localStorage.getItem("avatar") || "/avatars/default-avatar.png"; // Valor predeterminado si no existe
  const points = parseInt(localStorage.getItem("points"), 10) || 0; // Valor predeterminado si no existe

  useEffect(() => {
    if (openModal) {
      const interval = setInterval(() => {
        const qrReaderElement = document.getElementById("qr-reader");
        if (qrReaderElement) {
          clearInterval(interval); // Detiene el intervalo una vez que el elemento está disponible
          try {
            const qrScanner = new Html5QrcodeScanner(
              "qr-reader",
              { fps: 10, qrbox: { width: 250, height: 250 } },
              false
            );

            qrScanner.render(
              async (decodedText) => {
                console.log("QR escaneado:", decodedText);

                // Verificar si el QR contiene la URL esperada
                const productionUrl = "https://chess-manager-jade.vercel.app";
                if (decodedText.startsWith(`${productionUrl}/join-room/`)) {
                  const roomId = decodedText.split("/").pop(); // Obtiene el roomId del QR
                  console.log("Room ID obtenido del QR:", roomId); // Log para depuración
                  try {
                    const roomRef = doc(db, "rooms", roomId);
                    const roomSnapshot = await getDoc(roomRef);

                    if (roomSnapshot.exists()) {
                      console.log("Datos de la sala:", roomSnapshot.data()); // Log para depuración

                      // Validar que los valores no sean undefined
                      if (!uid || !nickname || !avatar || points === undefined || points === null) {
                        alert("Los datos del usuario no están completos.");
                        console.log("Valores inválidos:", { uid, nickname, avatar, points });
                        return;
                      }

                      // Validar que el campo participants sea un array
                      const roomData = roomSnapshot.data();
                      if (!Array.isArray(roomData.participants)) {
                        alert("El campo 'participants' no es un array.");
                        return;
                      }

                      // Log para depuración
                      console.log("Datos que se están enviando a Firestore:", { uid, nickname, avatar, points });

                      // Actualizar Redux con los datos del usuario
                      dispatch(
                        login({
                          uid,
                          nickname,
                          avatar,
                          points,
                          rol: "jugador",
                        })
                      );

                      // Agregar al usuario como participante en Firebase
                      await updateDoc(roomRef, {
                        participants: arrayUnion({ uid, nickname, avatar, points }),
                      });
                      qrScanner.clear(); // Limpia el escáner
                      setOpenModal(false); // Cierra el modal
                      navigate(`/waiting/${roomId}`); // Redirige a la sala de espera
                    } else {
                      alert("La sala no existe.");
                    }
                  } catch (error) {
                    console.error("Error al unirse a la sala:", error);
                    alert(`Hubo un problema al unirse a la sala: ${error.message}`);
                  }
                } else {
                  alert("El QR escaneado no es válido.");
                }
              },
              (errorMessage) => {
                console.error("Error al escanear el QR:", errorMessage);
              }
            );
          } catch (error) {
            console.error("Error al inicializar el escáner:", error);
            setCameraError("No se pudo inicializar el escáner. Verifica los permisos de cámara.");
          }
        }
      }, 100); // Verifica cada 100ms si el elemento está disponible
    }
  }, [openModal, navigate, dispatch]);

  return (
    <Box textAlign="center" mt={4}>
      {/* Botón para abrir el modal */}
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
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

      {/* Modal para el escaneo */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="qr-modal-title"
        aria-describedby="qr-modal-description"
      >
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "#ffffff",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            id="qr-modal-title"
            variant="h6"
            component="h2"
            mb={2}
            sx={{ color: "#000039", fontWeight: "700" }}
          >
            Escaneando QR...
          </Typography>
          <div id="qr-reader" style={{ width: "100%" }}></div>
          {cameraError && (
            <Typography color="error" mt={2}>
              {cameraError}
            </Typography>
          )}
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            sx={{
              mt: 2,
              borderColor: "#000039",
              color: "#000039",
              borderRadius: "10px",
              fontWeight: "bold",
              "&:hover": {
                borderColor: "#000039",
                bgcolor: "#f0f0f0",
              },
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default QRScanner;