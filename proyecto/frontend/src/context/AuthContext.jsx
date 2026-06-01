import { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al montar, restaurar sesión desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const usr   = localStorage.getItem("usuario");
    if (token && usr) {
      setUsuario(JSON.parse(usr));
    }
    setCargando(false);
  }, []);

  const login = async (username, password) => {
    const data = await loginApi(username, password);
    if (data.error) throw new Error(data.error);
    localStorage.setItem("token",   data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    setUsuario(data.usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
