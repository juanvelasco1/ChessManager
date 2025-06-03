import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = () => {
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const [cameraError, setCameraError] = useState(null); // Estado para manejar errores de cámara
  const [isScannerInitialized, setIsScannerInitialized] = useState(false); // Estado para verificar si el escáner está inicializado

  useEffect(() => {
    if (openModal && !isScannerInitialized) {
      const qrReaderElement = document.getElementById("qr-reader");
      if (qrReaderElement) {
        try {
          const qrScanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
          );

          qrScanner.render(
            (decodedText) => {
              console.log("QR escaneado:", decodedText);
              qrScanner.clear(); // Limpia el escáner
              setOpenModal(false); // Cierra el modal
            },
            (errorMessage) => {
              console.error("Error al escanear el QR:", errorMessage);
            }
          );

          setIsScannerInitialized(true); // Marca el escáner como inicializado
        } catch (error) {
          console.error("Error al inicializar el escáner:", error);
          setCameraError("No se pudo inicializar el escáner. Verifica los permisos de cámara.");
        }
      } else {
        setCameraError("No se encontró el elemento QR Reader en el DOM.");
      }
    }
  }, [openModal, isScannerInitialized]);

  return (
    <Box textAlign="center" mt={4}>
      {/* Botón para abrir el modal */}
      <Button
        variant="contained"
        onClick={() => {
          setOpenModal(true);
          setIsScannerInitialized(false); // Reinicia el estado de inicialización
        }}
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
          {cameraError && (
            <Typography color="error" mt={2}>
              {cameraError}
            </Typography>
          )}
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