import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

/**
  Componente para mostrar el QR de la sala y escanearlo.
  @param {string} roomId - ID de la sala.
 */
const RoomQR = ({ roomId }) => {
  const productionUrl = "https://chess-manager-jade.vercel.app"; // URL de tu proyecto en Vercel
  const roomLink = `${productionUrl}/join-room/${roomId}`; // Redirige a la ruta de validación
  const [isScanning, setIsScanning] = useState(false); // Estado para controlar el escaneo
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.uid); // UID del jugador
  const nickname = useSelector((state) => state.auth.nickname); // Nickname del jugador

  const handleScan = async (decodedText) => {
    if (decodedText.startsWith(`${productionUrl}/join-room/`)) {
      const scannedRoomId = decodedText.split("/").pop(); // Obtiene el roomId del QR
      try {
        const roomRef = doc(db, "rooms", scannedRoomId);
        await updateDoc(roomRef, {
          participants: arrayUnion({ uid, nickname, points: 0 }),
        });
        navigate(`/lobby/${scannedRoomId}`); // Redirige al lobby
      } catch (error) {
        console.error("Error al unirse a la sala:", error);
        alert("Hubo un problema al unirse a la sala.");
      }
    } else {
      alert("El QR escaneado no es válido.");
    }
  };

  const handleError = (errorMessage) => {
    console.error("Error al escanear el QR:", errorMessage);
    alert("Hubo un problema al escanear el QR.");
  };

  useEffect(() => {
    if (isScanning) {
      const qrScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      qrScanner.render(handleScan, handleError);

      return () => qrScanner.clear(); // Limpia el escáner al desmontar el componente
    }
  }, [isScanning]);

  return (
    <Box textAlign="center" mb={4}>
      {!isScanning ? (
        <>
          <Typography fontWeight="bold" color="#000039" fontSize="20px" mb={2}>
            Escanea el QR para unirte
          </Typography>
          <QRCode value={roomLink} size={200} />
          <Button
            variant="contained"
            onClick={() => setIsScanning(true)} // Activa el escaneo
            sx={{
              mt: 2,
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
        </>
      ) : (
        <>
          <Typography fontWeight="bold" color="#000039" fontSize="20px" mb={2}>
            Escaneando QR...
          </Typography>
          <div id="qr-reader" style={{ width: "100%" }}></div>
          <Button
            variant="outlined"
            onClick={() => setIsScanning(false)} // Detiene el escaneo
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
        </>
      )}
    </Box>
  );
};

export default RoomQR;