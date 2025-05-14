import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { uid, rol, email, loading } = useSelector((state) => state.auth);

  if (loading) {
    // Mostrar un indicador de carga mientras los datos se sincronizan
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

  if (!uid) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && (
    (requiredRole === "administrador" && email !== "administrador@gmail.com" && rol !== "administrador") ||
    (requiredRole !== "administrador" && rol !== requiredRole)
  )) {
    console.log("Acceso denegado. Rol del usuario:", rol, "Correo:", email, "Rol requerido:", requiredRole);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;