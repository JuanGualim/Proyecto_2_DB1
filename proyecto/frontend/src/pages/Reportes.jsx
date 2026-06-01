import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CARDS = [
  { titulo: "Reporte de Ventas",    ruta: "ventas",           descripcion: "Detalle de todas las ventas con cliente, producto y subtotal." },
  { titulo: "Clientes Top",         ruta: "clientes",         descripcion: "Clientes con más compras que el promedio (subconsulta)." },
  { titulo: "Productos Populares",  ruta: "productos",        descripcion: "Productos con más de 5 unidades vendidas (GROUP BY + HAVING)." },
  { titulo: "Productos Vendidos",   ruta: "vendidos",         descripcion: "Lista de productos que han tenido al menos una venta (IN subquery)." },
  { titulo: "Reporte Clientes",     ruta: "reporte-clientes", descripcion: "Total de compras y dinero gastado por cada cliente (GROUP BY)." },
  { titulo: "Reporte Productos",    ruta: "reporte-productos",descripcion: "Ingresos y unidades vendidas por producto (GROUP BY + SUM)." },
  { titulo: "Clientes Elite (CTE)", ruta: "elite",            descripcion: "Clientes con gasto superior al promedio usando CTE de SQL." },
];

function Reportes() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0" }}>
      <Navbar titulo="Reportes" backTo="/" />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#111827", margin: "0 0 4px" }}>Selecciona un reporte</h2>
          <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>Haz clic en cualquier tarjeta para ver el detalle.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "16px" }}>
          {CARDS.map((c) => (
            <div key={c.ruta} onClick={() => navigate(`/reportes/${c.ruta}`)}
              style={{ background: "white", border: "1.5px solid #fed7aa", borderRadius: "14px", padding: "22px", cursor: "pointer", transition: "all 0.18s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(249,115,22,0.14)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#fed7aa"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 36, height: 36, background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", margin: "0 0 6px" }}>{c.titulo}</h3>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 14px", lineHeight: 1.5 }}>{c.descripcion}</p>
              <span style={{ color: "#ea580c", fontSize: "13px", fontWeight: 700 }}>Ver reporte →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reportes;
