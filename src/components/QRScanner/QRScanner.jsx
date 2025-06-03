import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const QRScanner = () => {
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.uid); // UID del jugador
  const nickname = useSelector((state) => state.auth.nickname); // Nickname del jugador
  const userRole = useSelector((state) => state.auth.rol); // Rol del usuario

  useEffect(() => {
    if (openModal) {
      const qrReaderElement = document.getElementById("qr-reader");
      if (qrReaderElement) {
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
              try {
                const roomRef = doc(db, "rooms", roomId);
                await updateDoc(roomRef, {
                  participants: arrayUnion({ uid, nickname, points: 0 }),
                });
                qrScanner.clear(); // Limpia el escáner
                setOpenModal(false); // Cierra el modal
                navigate(`/lobby/${roomId}`); // Redirige al lobby
              } catch (error) {
                console.error("Error al unirse a la sala:", error);
                alert("Hubo un problema al unirse a la sala.");
              }
            } else {
              alert("El QR escaneado no es válido.");
            }
          },
          (errorMessage) => {
            console.error("Error al escanear el QR:", errorMessage);
          }
        );

        return () => qrScanner.clear(); // Limpia el escáner al desmontar el componente
      }
    }
  }, [openModal, navigate, uid, nickname]);

  // Mostrar el botón solo si el usuario es un jugador
  if (userRole !== "jugador") {
    return null;
  }

  return (
    <Box textAlign="center" mt={4}>
      {/* Botón para abrir el modal */}
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)} // Abre el modal
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
        onClose={() => setOpenModal(false)} // Cierra el modal
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
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)} // Cierra el modal
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