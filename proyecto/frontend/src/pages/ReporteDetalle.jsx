import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getReporteVentas, getClientesTop, getProductosPopulares,
  getProductosVendidos, getReporteClientes, getReporteProductos, getClientesElite,
} from "../services/api";
import Navbar from "../components/Navbar";

const CONFIG = {
  ventas:            { titulo: "Reporte de Ventas",    columnas: ["Cliente","Empleado","Producto","Cantidad","Precio Unit.","Subtotal"], render: (v) => [v.cliente, v.empleado, v.producto, v.cantidad, `$${v.precio_unitario}`, `$${v.subtotal}`] },
  clientes:          { titulo: "Clientes Top",          columnas: ["Cliente","Total Compras"],                                            render: (c) => [c.nombre, c.total_compras] },
  productos:         { titulo: "Productos Populares",   columnas: ["Producto","Total Vendido"],                                           render: (p) => [p.producto, p.total_vendido] },
  vendidos:          { titulo: "Productos Vendidos",    columnas: ["Producto","Precio"],                                                  render: (p) => [p.nombre, `$${p.precio}`] },
  "reporte-clientes":{ titulo: "Reporte de Clientes",  columnas: ["Cliente","Cantidad Compras","Total Gastado"],                          render: (c) => [c.cliente, c.cantidad_compras, `$${c.total_gastado}`] },
  "reporte-productos":{ titulo: "Reporte de Productos",columnas: ["Producto","Total Vendido","Ingresos"],                                 render: (p) => [p.producto, p.total_vendido, `$${p.ingresos}`] },
  elite:             { titulo: "Clientes Elite (CTE)",  columnas: ["Cliente","Total Gastado"],                                            render: (c) => [c.nombre, `$${c.total_gastado}`] },
};

const FETCHERS = {
  ventas:             getReporteVentas,
  clientes:           getClientesTop,
  productos:          getProductosPopulares,
  vendidos:           getProductosVendidos,
  "reporte-clientes": getReporteClientes,
  "reporte-productos":getReporteProductos,
  elite:              getClientesElite,
};

function ReporteDetalle() {
  const { tipo }   = useParams();
  const navigate   = useNavigate();
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);

  const config = CONFIG[tipo] || { titulo: tipo, columnas: [], render: () => [] };

  useEffect(() => {
    setLoading(true);
    if (FETCHERS[tipo]) {
      FETCHERS[tipo]().then((d) => { setData(Array.isArray(d) ? d : []); setLoading(false); });
    } else { setLoading(false); }
  }, [tipo]);

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0" }}>
      <Navbar titulo={config.titulo} backTo="/reportes" backLabel="← Reportes" />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
        <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>{data.length} registro{data.length !== 1 ? "s" : ""} encontrado{data.length !== 1 ? "s" : ""}</p>

        <div style={{ background: "white", border: "1.5px solid #fed7aa", borderRadius: "16px", overflow: "hidden" }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px", color: "#9ca3af" }}>
              Cargando...
            </div>
          ) : data.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px", color: "#9ca3af" }}>No hay datos disponibles</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#fff7ed", borderBottom: "2px solid #fed7aa" }}>
                    {config.columnas.map((col, i) => (
                      <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#9a3412", textTransform: "uppercase" }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => {
                    const cells = config.render(row);
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #fef3c7" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#fff7ed")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                        {cells.map((cell, j) => (
                          <td key={j} style={{ padding: "12px 16px", fontSize: "14px", color: j === cells.length - 1 ? "#ea580c" : "#374151", fontWeight: j === cells.length - 1 ? 700 : 400 }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReporteDetalle;
