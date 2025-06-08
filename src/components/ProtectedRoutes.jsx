import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { uid, rol, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!loading && !uid) {
    return <Navigate to="/login" />;
  }

  if (
    !loading &&
    uid &&
    requiredRole &&
    (
      (requiredRole === "profesor" && rol !== "profesor") ||
      (requiredRole === "jugador" && rol !== "jugador") // Permitir acceso a jugadores
    )
  ) {
    console.log("Acceso denegado. Rol del usuario:", rol ?? "no definido", "Rol requerido:", requiredRole);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;