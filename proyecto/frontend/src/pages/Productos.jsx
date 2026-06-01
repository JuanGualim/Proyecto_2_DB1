import { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import FormProducto from "../components/FormProducto";

function Productos() {
  const [productos, setProductos]         = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [modo, setModo]                   = useState(null);
  const { usuario }                       = useAuth();

  const puedeCRUD   = ["admin", "gerente"].includes(usuario?.rol);
  const puedeEliminar = usuario?.rol === "admin";

  const cargar = async () => setProductos(await getProductos());
  useEffect(() => { cargar(); }, []);

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return;
    await deleteProducto(id);
    cargar();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0" }}>
      <Navbar titulo="Productos" backTo="/" />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#111827", margin: 0 }}>Inventario</h2>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "4px 0 0" }}>{productos.length} productos</p>
          </div>
          {puedeCRUD && (
            <button
              onClick={() => { setProductoEditar(null); setModo("crear"); }}
              style={{ background: "#ea580c", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
            >
              + Nuevo Producto
            </button>
          )}
        </div>

        <div style={{ background: "white", border: "1.5px solid #fed7aa", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#fff7ed", borderBottom: "2px solid #fed7aa" }}>
                  {["ID","Nombre","Precio","Stock","Categoría","Proveedor", puedeCRUD ? "Acciones" : ""].map((col, i) => (
                    <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#9a3412", textTransform: "uppercase", letterSpacing: "0.05em" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id_producto} style={{ borderBottom: "1px solid #fef3c7" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fff7ed")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#9ca3af", fontFamily: "monospace" }}>#{p.id_producto}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600, color: "#111827" }}>{p.nombre}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 700, color: "#ea580c" }}>${p.precio}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ background: p.stock > 10 ? "#f0fdf4" : p.stock > 0 ? "#fffbeb" : "#fef2f2", color: p.stock > 10 ? "#16a34a" : p.stock > 0 ? "#d97706" : "#dc2626", border: `1px solid ${p.stock > 10 ? "#bbf7d0" : p.stock > 0 ? "#fde68a" : "#fecaca"}`, borderRadius: "6px", padding: "2px 10px", fontSize: "13px", fontWeight: 600 }}>
                        {p.stock}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>{p.id_categoria}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>{p.id_proveedor}</td>
                    {puedeCRUD && (
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => { setProductoEditar(p); setModo("editar"); }}
                            style={{ background: "#fff7ed", color: "#ea580c", border: "1.5px solid #fed7aa", borderRadius: "7px", padding: "5px 12px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                            Editar
                          </button>
                          {puedeEliminar && (
                            <button onClick={() => handleDelete(p.id_producto, p.nombre)}
                              style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: "7px", padding: "5px 12px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {(modo === "crear" || modo === "editar") && (
        <FormProducto
          productoEditar={productoEditar}
          onDone={() => { setModo(null); setProductoEditar(null); cargar(); }}
          onCancel={() => { setModo(null); setProductoEditar(null); }}
        />
      )}
    </div>
  );
}

export default Productos;
