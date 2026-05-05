import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getReporteVentas,
  getClientesTop,
  getProductosPopulares,
  getProductosVendidos,
  getReporteClientes,
  getReporteProductos,
  getClientesElite,
  crearVenta, // 🔥 NUEVO
} from "../services/api";

const reporteConfig = {
  ventas: {
    titulo: "Reporte de Ventas",
    columnas: ["Cliente", "Empleado", "Producto", "Cantidad", "Precio Unit.", "Subtotal"],
    render: (v) => [v.cliente, v.empleado, v.producto, v.cantidad, `$${v.precio_unitario}`, `$${v.subtotal}`],
    destacado: 5,
  },
  clientes: {
    titulo: "Clientes Top",
    columnas: ["Cliente", "Total Compras"],
    render: (c) => [c.nombre, c.total_compras],
    destacado: 1,
  },
  productos: {
    titulo: "Productos Populares",
    columnas: ["Producto", "Total Vendido"],
    render: (p) => [p.producto, p.total_vendido],
    destacado: 1,
  },
  vendidos: {
    titulo: "Productos Vendidos",
    columnas: ["Producto", "Precio"],
    render: (p) => [p.nombre, `$${p.precio}`],
    destacado: 1,
  },
  "reporte-clientes": {
    titulo: "Reporte de Clientes",
    columnas: ["Cliente", "Cantidad Compras", "Total Gastado"],
    render: (c) => [c.cliente, c.cantidad_compras, `$${c.total_gastado}`],
    destacado: 2,
  },
  "reporte-productos": {
    titulo: "Reporte de Productos",
    columnas: ["Producto", "Total Vendido", "Ingresos"],
    render: (p) => [p.producto, p.total_vendido, `$${p.ingresos}`],
    destacado: 2,
  },
  elite: {
    titulo: "Clientes Elite (CTE)",
    columnas: ["Cliente", "Total Gastado"],
    render: (c) => [c.nombre, `$${c.total_gastado}`],
    destacado: 1,
  },
};

const fetchers = {
  ventas: getReporteVentas,
  clientes: getClientesTop,
  productos: getProductosPopulares,
  vendidos: getProductosVendidos,
  "reporte-clientes": getReporteClientes,
  "reporte-productos": getReporteProductos,
  elite: getClientesElite,
};

function ReporteDetalle() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(""); // 🔥 NUEVO

  const config = reporteConfig[tipo] || { titulo: tipo, columnas: [], render: () => [], destacado: -1 };

  useEffect(() => {
    setLoading(true);
    setData([]);
    setMensaje("");

    if (fetchers[tipo]) {
      fetchers[tipo]().then((d) => {
        setData(d);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [tipo]);

  // 🔥 FUNCIÓN DE TRANSACCIÓN
  const handleCrearVenta = async () => {
    try {
      await crearVenta();
      setMensaje("Venta creada correctamente");

      // refrescar datos automáticamente
      fetchers["ventas"]().then(setData);
    } catch (error) {
      setMensaje("Error al crear la venta");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#fdf6f0" }}>
      {/* Header */}
      <header
        style={{ background: "#ea580c", borderBottom: "4px solid #c2410c" }}
        className="px-8 py-4 flex items-center gap-4 shadow-lg"
      >
        <button
          onClick={() => navigate("/reportes")}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1.5px solid rgba(255,255,255,0.3)",
            color: "white",
            borderRadius: "8px",
            padding: "6px 14px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          ← Reportes
        </button>

        {/* 🔥 BOTÓN CREAR VENTA */}
        {tipo === "ventas" && (
          <button
            onClick={handleCrearVenta}
            style={{
              background: "#16a34a",
              border: "1.5px solid #15803d",
              color: "white",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            + Crear Venta
          </button>
        )}

        <div>
          <h1 className="text-white font-bold text-lg leading-tight">
            {config.titulo}
          </h1>
          <p className="text-orange-100 text-xs">
            {data.length} registro{data.length !== 1 ? "s" : ""} encontrado
            {data.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      {/* 🔥 MENSAJE */}
      {mensaje && (
        <div className="px-8 mt-4">
          <p className="text-green-600 font-semibold">{mensaje}</p>
        </div>
      )}

      <div className="px-8 py-8 max-w-5xl mx-auto">
        <div
          style={{
            background: "white",
            border: "1.5px solid #fed7aa",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 2px 16px rgba(249,115,22,0.07)",
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: "3px solid #fed7aa",
                  borderTop: "3px solid #f97316",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  marginRight: 12,
                }}
              />
              Cargando...
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              No hay datos disponibles
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr
                    style={{
                      background: "#fff7ed",
                      borderBottom: "2px solid #fed7aa",
                    }}
                  >
                    {config.columnas.map((col, i) => (
                      <th
                        key={i}
                        className="px-5 py-3 text-left"
                        style={{
                          color: "#9a3412",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data.map((row, i) => {
                    const cells = config.render(row);
                    return (
                      <tr
                        key={i}
                        style={{
                          borderBottom: "1px solid #fef3c7",
                        }}
                      >
                        {cells.map((cell, j) => (
                          <td
                            key={j}
                            className="px-5 py-3 text-sm"
                            style={{
                              color:
                                j === config.destacado
                                  ? "#ea580c"
                                  : "#374151",
                              fontWeight:
                                j === config.destacado ? 700 : 400,
                            }}
                          >
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

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default ReporteDetalle;