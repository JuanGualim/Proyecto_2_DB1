import { useNavigate } from "react-router-dom";

const cards = [
  {
    titulo: "Reporte de Ventas",
    ruta: "ventas",
    descripcion: "Detalle de todas las ventas con cliente, producto y subtotal.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M10 22V16m4 6V12m4 10V14m4 8V10" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titulo: "Clientes Top",
    ruta: "clientes",
    descripcion: "Clientes con más compras que el promedio (subconsulta).",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
        <circle cx="16" cy="12" r="4" stroke="#f97316" strokeWidth="2"/>
        <path d="M8 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titulo: "Productos Populares",
    ruta: "productos",
    descripcion: "Productos con más de 5 unidades vendidas (GROUP BY + HAVING).",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M16 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" stroke="#f97316" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    titulo: "Productos Vendidos",
    ruta: "vendidos",
    descripcion: "Lista de productos que han tenido al menos una venta (IN subquery).",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
        <rect x="9" y="12" width="14" height="10" rx="2" stroke="#f97316" strokeWidth="2"/>
        <path d="M12 12V10a4 4 0 018 0v2" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titulo: "Reporte Clientes",
    ruta: "reporte-clientes",
    descripcion: "Total de compras y dinero gastado por cada cliente (GROUP BY).",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M9 10h14M9 16h10M9 22h6" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    titulo: "Reporte Productos",
    ruta: "reporte-productos",
    descripcion: "Ingresos y unidades vendidas por producto (GROUP BY + SUM).",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M16 8v16M8 16h16" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="5" stroke="#f97316" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    titulo: "Clientes Elite (CTE)",
    ruta: "elite",
    descripcion: "Clientes con gasto superior al promedio usando CTE de SQL.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
        <path d="M16 9l1.8 5.4H23l-4.5 3.3 1.7 5.3L16 20l-4.2 3 1.7-5.3L9 14.4h5.2z" fill="#f97316" opacity="0.3" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function NavBar({ onBack }) {
  return (
    <header style={{ background: "#ea580c", borderBottom: "4px solid #c2410c" }} className="px-8 py-4 flex items-center gap-4 shadow-lg">
      <button
        onClick={onBack}
        style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "white", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
      >
        ← Inicio
      </button>
      <div>
        <h1 className="text-white font-bold text-lg leading-tight">Reportes</h1>
        <p className="text-orange-100 text-xs">Análisis y consultas avanzadas</p>
      </div>
    </header>
  );
}

function Reportes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "#fdf6f0" }}>
      <NavBar onBack={() => navigate("/")} />

      <div className="px-8 py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Selecciona un reporte</h2>
          <p className="text-gray-500 text-sm mt-1">Haz clic en cualquier tarjeta para ver el detalle del reporte.</p>
        </div>

        <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {cards.map((c) => (
            <div
              key={c.ruta}
              onClick={() => navigate(`/reportes/${c.ruta}`)}
              className="cursor-pointer flex items-start gap-4"
              style={{
                background: "white",
                border: "1.5px solid #fed7aa",
                borderRadius: "14px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(249,115,22,0.06)",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#f97316";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(249,115,22,0.14)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#fed7aa";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(249,115,22,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ flexShrink: 0, marginTop: "2px" }}>{c.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">{c.titulo}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.descripcion}</p>
                <span style={{ display: "inline-block", marginTop: "10px", color: "#ea580c", fontSize: "13px", fontWeight: 600 }}>
                  Ver reporte →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reportes;