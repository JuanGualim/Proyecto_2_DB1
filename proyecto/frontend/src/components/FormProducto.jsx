import { useState, useEffect } from "react";
import { createProducto, updateProducto } from "../services/api";

function FormProducto({ onDone, productoEditar, onCancel }) {
  const [form, setForm] = useState({
    nombre: "", precio: "", stock: "", id_categoria: "", id_proveedor: "",
  });
  const [error, setError]   = useState("");
  const [loading, setLoad]  = useState(false);

  useEffect(() => {
    if (productoEditar) setForm(productoEditar);
  }, [productoEditar]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoad(true);
    try {
      const res = productoEditar
        ? await updateProducto(productoEditar.id_producto, form)
        : await createProducto(form);
      if (res.error) throw new Error(res.error);
      onDone();
    } catch (err) {
      setError(err.message);
    } finally { setLoad(false); }
  };

  const isEditing = !!productoEditar;

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div style={{ background: "white", borderRadius: "18px", padding: "36px", width: "100%", maxWidth: "480px", border: "2px solid #fed7aa", boxShadow: "0 20px 60px rgba(249,115,22,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827", margin: 0 }}>
            {isEditing ? "Editar Producto" : "Nuevo Producto"}
          </h3>
          <button onClick={onCancel} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#9ca3af" }}>×</button>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            {[
              { name: "nombre",       label: "Nombre",      placeholder: "Ej: Laptop",  cols: 2 },
              { name: "precio",       label: "Precio",      placeholder: "499.99",      cols: 1 },
              { name: "stock",        label: "Stock",       placeholder: "50",          cols: 1 },
              { name: "id_categoria", label: "ID Categoría",placeholder: "1",           cols: 1 },
              { name: "id_proveedor", label: "ID Proveedor",placeholder: "2",           cols: 1 },
            ].map(({ name, label, placeholder, cols }) => (
              <div key={name} style={{ gridColumn: `span ${cols}` }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                <input
                  name={name} placeholder={placeholder} value={form[name]}
                  onChange={handleChange} required
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" disabled={loading} style={{ flex: 1, background: "#ea580c", color: "white", border: "none", borderRadius: "9px", padding: "11px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
              {loading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Producto"}
            </button>
            <button type="button" onClick={onCancel} style={{ padding: "11px 18px", background: "#f3f4f6", color: "#6b7280", border: "none", borderRadius: "9px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormProducto;
