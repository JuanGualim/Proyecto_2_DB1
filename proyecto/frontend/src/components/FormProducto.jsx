import { useState, useEffect } from "react";
import { createProducto, updateProducto } from "../services/api";

function FormProducto({ onProductoCreado, productoEditar, setProductoEditar, modo, setModo }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    id_categoria: "",
    id_proveedor: "",
  });

  useEffect(() => {
    if (productoEditar) {
      setForm(productoEditar);
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productoEditar) {
      await updateProducto(productoEditar.id_producto, form);
      setProductoEditar(null);
    } else {
      await createProducto(form);
    }
    setForm({ nombre: "", precio: "", stock: "", id_categoria: "", id_proveedor: "" });
    setModo(null);
    onProductoCreado();
  };

  const handleCancel = () => {
    setForm({ nombre: "", precio: "", stock: "", id_categoria: "", id_proveedor: "" });
    setProductoEditar(null);
    setModo(null);
  };

  const isEditing = !!productoEditar;

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleCancel(); }}
    >
      <div
        style={{
          background: "white", borderRadius: "18px", padding: "36px",
          width: "100%", maxWidth: "480px",
          border: "2px solid #fed7aa",
          boxShadow: "0 20px 60px rgba(249,115,22,0.18)",
          animation: "slideUp 0.2s ease",
        }}
      >
        {/* Título */}
        <div className="flex items-center gap-3 mb-6">
          <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: "10px", padding: "8px" }}>
            {isEditing ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#f97316" strokeWidth="2"/>
                <path d="M12 8v8M8 12h8" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h3>
            <p className="text-gray-400 text-xs">{isEditing ? `Modificando: ${productoEditar.nombre}` : "Completa los campos para agregar"}</p>
          </div>
          <button onClick={handleCancel} style={{ marginLeft: "auto", color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: "22px", lineHeight: 1 }}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { name: "nombre", label: "Nombre", placeholder: "Ej: Laptop", cols: 2 },
              { name: "precio", label: "Precio", placeholder: "Ej: 499.99", cols: 1 },
              { name: "stock", label: "Stock", placeholder: "Ej: 50", cols: 1 },
              { name: "id_categoria", label: "ID Categoría", placeholder: "Ej: 1", cols: 1 },
              { name: "id_proveedor", label: "ID Proveedor", placeholder: "Ej: 2", cols: 1 },
            ].map(({ name, label, placeholder, cols }) => (
              <div key={name} style={{ gridColumn: `span ${cols}` }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {label}
                </label>
                <input
                  name={name}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb",
                    borderRadius: "8px", fontSize: "14px", outline: "none",
                    transition: "border-color 0.15s",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = "#f97316"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              style={{ flex: 1, background: "#ea580c", color: "white", border: "none", borderRadius: "9px", padding: "11px", fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.target.style.background = "#c2410c"}
              onMouseLeave={e => e.target.style.background = "#ea580c"}
            >
              {isEditing ? "Guardar Cambios" : "Crear Producto"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{ padding: "11px 18px", background: "#f3f4f6", color: "#6b7280", border: "none", borderRadius: "9px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

export default FormProducto;