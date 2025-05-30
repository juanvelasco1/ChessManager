import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { uid, rol, email, loading } = useSelector((state) => state.auth);

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

  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!loading && uid && requiredRole && (
    (requiredRole === "profesor" && normalizedEmail !== "profesor@gmail.com" && rol !== "profesor") ||
    (requiredRole !== "profesor" && rol !== requiredRole)
  )) {
    console.log("Acceso denegado. Rol del usuario:", rol ?? "no definido", "Correo:", email ?? "no definido", "Rol requerido:", requiredRole);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;