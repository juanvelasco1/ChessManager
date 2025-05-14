import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, requiredRole }) => {
  const authState = useSelector((state) => state.auth); // Obtén todo el estado auth
  console.log("Estado global auth:", authState); // Depuración

  const { uid, rol, loading } = authState;

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

  if (!uid) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && rol !== requiredRole) {
    console.log("Acceso denegado. Rol del usuario:", rol, "Rol requerido:", requiredRole);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;