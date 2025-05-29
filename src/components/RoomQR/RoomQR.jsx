import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

/**
 * Componente para mostrar el QR de la sala.
 * @param {string} roomId - ID de la sala.
 */
const RoomQR = ({ roomId }) => {
  const roomLink = `${window.location.origin}/join-room/${roomId}`;

  return (
    <Box textAlign="center" mb={4}>
      <Typography fontWeight="bold" color="#000039" fontSize="20px" mb={2}>
        Escanea el QR para unirte
      </Typography>
      <QRCode value={roomLink} size={200} />
    </Box>
  );
};

export default RoomQR;