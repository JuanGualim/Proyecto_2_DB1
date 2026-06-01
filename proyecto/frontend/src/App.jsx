import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Login        from "./pages/Login";
import Inicio       from "./pages/Inicio";
import Productos    from "./pages/Productos";
import Clientes     from "./pages/Clientes";
import Ventas       from "./pages/Ventas";
import Reportes     from "./pages/Reportes";
import ReporteDetalle from "./pages/ReporteDetalle";
import SinPermiso   from "./pages/SinPermiso";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", background: "#fdf6f0" }}>
          <Routes>
            {/* Pública */}
            <Route path="/login" element={<Login />} />
            <Route path="/sin-permiso" element={<SinPermiso />} />

            {/* Protegidas — cualquier rol autenticado */}
            <Route path="/" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />

            <Route path="/productos" element={
              <ProtectedRoute roles={["admin","gerente","vendedor","cajero","bodeguero"]}>
                <Productos />
              </ProtectedRoute>
            } />

            <Route path="/clientes" element={
              <ProtectedRoute roles={["admin","gerente","vendedor","cajero"]}>
                <Clientes />
              </ProtectedRoute>
            } />

            <Route path="/ventas" element={
              <ProtectedRoute roles={["admin","gerente","vendedor","cajero"]}>
                <Ventas />
              </ProtectedRoute>
            } />

            {/* Solo admin y gerente */}
            <Route path="/reportes" element={
              <ProtectedRoute roles={["admin","gerente"]}>
                <Reportes />
              </ProtectedRoute>
            } />
            <Route path="/reportes/:tipo" element={
              <ProtectedRoute roles={["admin","gerente"]}>
                <ReporteDetalle />
              </ProtectedRoute>
            } />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
