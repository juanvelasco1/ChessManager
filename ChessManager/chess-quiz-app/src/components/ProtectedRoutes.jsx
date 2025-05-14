import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { uid, rol } = useSelector((state) => state.auth);

  if (!uid) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;