import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductos, deleteProducto } from "../services/api";
import FormProducto from "../components/FormProducto";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [modo, setModo] = useState(null); // "crear" | "editar" | null
  const navigate = useNavigate();

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  useEffect(() => { cargarProductos(); }, []);

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return;
    await deleteProducto(id);
    setProductos(productos.filter((p) => p.id_producto !== id));
  };

  const handleEditar = (p) => {
    setProductoEditar(p);
    setModo("editar");
  };

  const handleCrear = () => {
    setProductoEditar(null);
    setModo("crear");
  };

  return (
    <div className="min-h-screen" style={{ background: "#fdf6f0" }}>
      {/* Header */}
      <header style={{ background: "#ea580c", borderBottom: "4px solid #c2410c" }} className="px-8 py-4 flex items-center gap-4 shadow-lg">
        <button
          onClick={() => navigate("/")}
          style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "white", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", cursor: "pointer" }}
        >
          ← Inicio
        </button>
        <div className="flex-1">
          <h1 className="text-white font-bold text-lg leading-tight">Productos</h1>
          <p className="text-orange-100 text-xs">{productos.length} producto{productos.length !== 1 ? "s" : ""} en inventario</p>
        </div>
        <button
          onClick={() => navigate("/reportes")}
          style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "white", borderRadius: "8px", padding: "6px 14px", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Reportes
        </button>
      </header>

      <div className="px-8 py-8 max-w-6xl mx-auto">
        {/* Botón crear */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Inventario</h2>
            <p className="text-gray-400 text-sm">Gestiona los productos de la tienda</p>
          </div>
          <button
            onClick={handleCrear}
            style={{ background: "#ea580c", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(234,88,12,0.3)", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c2410c"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ea580c"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
              <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Nuevo Producto
          </button>
        </div>

        {/* Tabla */}
        <div style={{ background: "white", border: "1.5px solid #fed7aa", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 16px rgba(249,115,22,0.07)" }}>
          {productos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 12, opacity: 0.4 }}>
                <rect x="8" y="14" width="32" height="26" rx="3" stroke="#f97316" strokeWidth="2"/>
                <path d="M16 14V10a8 8 0 0116 0v4" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              No hay productos registrados
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr style={{ background: "#fff7ed", borderBottom: "2px solid #fed7aa" }}>
                    {["ID", "Nombre", "Precio", "Stock", "Categoría", "Proveedor", "Acciones"].map((col) => (
                      <th key={col} className="px-5 py-3 text-left" style={{ color: "#9a3412", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr
                      key={p.id_producto}
                      style={{ borderBottom: "1px solid #fef3c7", transition: "background 0.12s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fff7ed"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td className="px-5 py-3 text-sm text-gray-400 font-mono">#{p.id_producto}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-gray-800">{p.nombre}</td>
                      <td className="px-5 py-3 text-sm font-bold" style={{ color: "#ea580c" }}>${p.precio}</td>
                      <td className="px-5 py-3 text-sm">
                        <span style={{
                          background: p.stock > 10 ? "#f0fdf4" : p.stock > 0 ? "#fffbeb" : "#fef2f2",
                          color: p.stock > 10 ? "#16a34a" : p.stock > 0 ? "#d97706" : "#dc2626",
                          border: `1px solid ${p.stock > 10 ? "#bbf7d0" : p.stock > 0 ? "#fde68a" : "#fecaca"}`,
                          borderRadius: "6px", padding: "2px 10px", fontSize: "13px", fontWeight: 600,
                        }}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-500">{p.id_categoria}</td>
                      <td className="px-5 py-3 text-sm text-gray-500">{p.id_proveedor}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditar(p)}
                            style={{ background: "#fff7ed", color: "#ea580c", border: "1.5px solid #fed7aa", borderRadius: "7px", padding: "5px 12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.12s" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#ea580c"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "#ea580c"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "#fff7ed"; e.currentTarget.style.color = "#ea580c"; e.currentTarget.style.borderColor = "#fed7aa"; }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(p.id_producto, p.nombre)}
                            style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: "7px", padding: "5px 12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.12s" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "#dc2626"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; e.currentTarget.style.borderColor = "#fecaca"; }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {(modo === "crear" || modo === "editar") && (
        <FormProducto
          onProductoCreado={cargarProductos}
          productoEditar={productoEditar}
          setProductoEditar={setProductoEditar}
          modo={modo}
          setModo={setModo}
        />
      )}
    </div>
  );
}

export default Productos;