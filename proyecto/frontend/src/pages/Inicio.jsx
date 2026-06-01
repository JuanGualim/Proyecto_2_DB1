import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const SECTIONS = [
  {
    id: "productos",
    ruta: "/productos",
    titulo: "Productos",
    descripcion: "Gestiona el inventario, crea, edita y elimina productos de la tienda.",
    roles: ["admin", "gerente", "vendedor", "cajero", "bodeguero"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <rect x="6" y="14" width="36" height="28" rx="3" fill="#f97316" opacity="0.15"/>
        <rect x="6" y="14" width="36" height="28" rx="3" stroke="#f97316" strokeWidth="2.5"/>
        <path d="M16 14V10a8 8 0 0116 0v4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="24" cy="28" r="4" fill="#f97316"/>
      </svg>
    ),
  },
  {
    id: "clientes",
    ruta: "/clientes",
    titulo: "Clientes",
    descripcion: "Administra la base de datos de clientes de la tienda.",
    roles: ["admin", "gerente", "vendedor", "cajero"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <circle cx="24" cy="18" r="8" fill="#f97316" opacity="0.15" stroke="#f97316" strokeWidth="2.5"/>
        <path d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "ventas",
    ruta: "/ventas",
    titulo: "Ventas",
    descripcion: "Registra nuevas ventas y consulta el historial de transacciones.",
    roles: ["admin", "gerente", "vendedor", "cajero"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <rect x="6" y="8" width="36" height="32" rx="3" fill="#f97316" opacity="0.15" stroke="#f97316" strokeWidth="2.5"/>
        <path d="M14 24h20M14 32h12" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M24 14l4 4-4 4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "reportes",
    ruta: "/reportes",
    titulo: "Reportes",
    descripcion: "Consulta reportes de ventas, clientes top, productos más vendidos y más.",
    roles: ["admin", "gerente"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
        <rect x="8" y="6" width="32" height="36" rx="3" fill="#f97316" opacity="0.15"/>
        <rect x="8" y="6" width="32" height="36" rx="3" stroke="#f97316" strokeWidth="2.5"/>
        <line x1="16" y1="18" x2="32" y2="18" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="25" x2="28" y2="25" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="32" x2="22" y2="32" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function Inicio() {
  const navigate       = useNavigate();
  const { usuario }    = useAuth();

  const seccionesVisibles = SECTIONS.filter((s) =>
    s.roles.includes(usuario?.rol)
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0" }}>
      <Navbar titulo="Panel de Control" />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Bienvenida */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{ color: "#ea580c", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
            Bienvenido
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>
            {usuario?.nombre}
          </h2>
          <p style={{ color: "#6b7280", fontSize: "15px" }}>
            Accedes como <b>{usuario?.rol}</b>. Solo verás las secciones habilitadas para tu rol.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
          {seccionesVisibles.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(s.ruta)}
              style={{ background: "white", border: "2px solid #fed7aa", borderRadius: "18px", padding: "32px 28px", cursor: "pointer", transition: "all 0.18s ease", textAlign: "center" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(249,115,22,0.15)"; e.currentTarget.style.borderColor = "#f97316"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#fed7aa"; }}
            >
              <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827", margin: "0 0 8px" }}>{s.titulo}</h3>
              <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.5, margin: "0 0 20px" }}>{s.descripcion}</p>
              <div style={{ background: "#fff7ed", color: "#ea580c", border: "1.5px solid #fed7aa", borderRadius: "8px", padding: "7px 18px", fontSize: "13px", fontWeight: 700, display: "inline-block" }}>
                Ir a {s.titulo} →
              </div>
            </div>
          ))}
        </div>

        {seccionesVisibles.length === 0 && (
          <div style={{ textAlign: "center", color: "#9ca3af", padding: "60px 0" }}>
            No tienes secciones habilitadas para tu rol.
          </div>
        )}
      </div>
    </div>
  );
}

export default Inicio;
