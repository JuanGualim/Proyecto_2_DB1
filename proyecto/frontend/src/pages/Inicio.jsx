import { useNavigate } from "react-router-dom";

const sections = [
  {
    id: "productos",
    ruta: "/productos",
    titulo: "Productos",
    descripcion: "Gestiona el inventario, crea, edita y elimina productos de la tienda.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="6" y="14" width="36" height="28" rx="3" fill="#f97316" opacity="0.15"/>
        <rect x="6" y="14" width="36" height="28" rx="3" stroke="#f97316" strokeWidth="2.5"/>
        <path d="M16 14V10a8 8 0 0116 0v4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="24" cy="28" r="4" fill="#f97316"/>
      </svg>
    ),
  },
  {
    id: "reportes",
    ruta: "/reportes",
    titulo: "Reportes",
    descripcion: "Consulta reportes de ventas, clientes top, productos más vendidos y más.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="8" y="6" width="32" height="36" rx="3" fill="#f97316" opacity="0.15"/>
        <rect x="8" y="6" width="32" height="36" rx="3" stroke="#f97316" strokeWidth="2.5"/>
        <line x1="16" y1="18" x2="32" y2="18" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="25" x2="28" y2="25" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="32" x2="22" y2="32" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="36" cy="36" r="7" fill="#f97316"/>
        <path d="M33 36l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdf6f0" }}>
      {/* Header */}
      <header style={{ background: "#ea580c", borderBottom: "4px solid #c2410c" }} className="px-8 py-5 flex items-center gap-3 shadow-lg">
        <div style={{ background: "white", borderRadius: "10px", padding: "6px 10px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-white font-bold text-xl leading-tight">Tienda</h1>
          <p className="text-orange-100 text-xs">Sistema de gestión</p>
        </div>
      </header>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div
          style={{ background: "#fff7ed", border: "2px solid #fed7aa", borderRadius: "16px", padding: "10px 22px", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}
        >
          <span style={{ color: "#ea580c", fontSize: "13px", fontWeight: 600 }}>Panel de Control</span>
        </div>
        <h2 className="font-bold text-gray-800 mb-3" style={{ fontSize: "2.4rem", lineHeight: 1.2 }}>
          ¿Qué deseas hacer hoy?
        </h2>
        <p className="text-gray-500 text-base max-w-md">
          Selecciona una sección para comenzar a trabajar con el sistema de la tienda.
        </p>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-8 px-8 pb-20 flex-wrap">
        {sections.map((s) => (
          <div
            key={s.id}
            onClick={() => navigate(s.ruta)}
            className="cursor-pointer flex flex-col items-center text-center"
            style={{
              background: "white",
              border: "2px solid #fed7aa",
              borderRadius: "20px",
              padding: "44px 48px",
              width: "280px",
              boxShadow: "0 4px 20px rgba(249,115,22,0.08)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(249,115,22,0.18)";
              e.currentTarget.style.borderColor = "#f97316";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(249,115,22,0.08)";
              e.currentTarget.style.borderColor = "#fed7aa";
            }}
          >
            <div style={{ marginBottom: "20px" }}>{s.icon}</div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">{s.titulo}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{s.descripcion}</p>
            <div
              style={{ marginTop: "28px", background: "#fff7ed", color: "#ea580c", border: "1.5px solid #fed7aa", borderRadius: "8px", padding: "8px 24px", fontSize: "14px", fontWeight: 600 }}
            >
              Ir a {s.titulo} →
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto text-center py-6 text-gray-400 text-xs border-t border-orange-100">
        Proyecto 2 — Bases de Datos 1
      </div>
    </div>
  );
}

export default Inicio;