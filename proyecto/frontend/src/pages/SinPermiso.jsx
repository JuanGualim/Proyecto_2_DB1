import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SinPermiso() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <div style={{ width: 72, height: 72, background: "#fef2f2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fca5a5" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2"/>
          <path d="M12 8v4M12 16h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", margin: 0 }}>Acceso denegado</h1>
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        Tu rol (<b>{usuario?.rol}</b>) no tiene permiso para acceder a esta sección.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{ background: "#ea580c", color: "white", border: "none", borderRadius: "10px", padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}
      >
        ← Volver al inicio
      </button>
    </div>
  );
}

export default SinPermiso;
