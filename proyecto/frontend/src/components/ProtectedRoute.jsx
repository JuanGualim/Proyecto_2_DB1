import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// roles: array de roles permitidos, vacío = cualquier autenticado
export const ProtectedRoute = ({ children, roles = [] }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) return <div className="flex items-center justify-center min-h-screen text-gray-500">Cargando...</div>;
  if (!usuario) return <Navigate to="/login" replace />;
  if (roles.length > 0 && !roles.includes(usuario.rol)) {
    return <Navigate to="/sin-permiso" replace />;
  }
  return children;
};
