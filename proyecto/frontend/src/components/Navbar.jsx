import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROL_BADGE = {
  admin:      { bg: "#fef2f2", border: "#fca5a5", text: "#dc2626" },
  gerente:    { bg: "#fff7ed", border: "#fdba74", text: "#ea580c" },
  vendedor:   { bg: "#f0fdf4", border: "#86efac", text: "#16a34a" },
  cajero:     { bg: "#eff6ff", border: "#93c5fd", text: "#2563eb" },
  bodeguero:  { bg: "#faf5ff", border: "#c4b5fd", text: "#7c3aed" },
};

function Navbar({ titulo, backTo, backLabel = "← Inicio" }) {
  const navigate     = useNavigate();
  const { usuario, logout } = useAuth();
  const badge        = ROL_BADGE[usuario?.rol] || {};

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <header style={{ background: "#ea580c", borderBottom: "4px solid #c2410c", padding: "12px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
      {backTo && (
        <button onClick={() => navigate(backTo)} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "white", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", cursor: "pointer" }}>
          {backLabel}
        </button>
      )}

      <div style={{ flex: 1 }}>
        <h1 style={{ color: "white", fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>{titulo}</h1>
      </div>

      {usuario && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div>
            <span style={{ display: "inline-block", background: badge.bg, color: badge.text, border: `1.5px solid ${badge.border}`, borderRadius: "6px", padding: "2px 10px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
              {usuario.rol}
            </span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", marginLeft: "8px" }}>{usuario.nombre}</span>
          </div>
          <button onClick={handleLogout} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "white", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", cursor: "pointer" }}>
            Salir
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
