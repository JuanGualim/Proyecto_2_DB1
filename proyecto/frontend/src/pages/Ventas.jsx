import { useEffect, useState } from "react";
import { getVentas, crearVenta, getProductos, getClientes } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function FormVenta({ onDone, onCancel, productos, clientes }) {
  const [form, setForm] = useState({ id_cliente: "", id_empleado: "1", id_producto: "", cantidad: "", precio: "" });
  const [error, setError]   = useState("");
  const [loading, setLoad]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoad(true);
    try {
      const res = await crearVenta({
        id_cliente:  Number(form.id_cliente),
        id_empleado: Number(form.id_empleado),
        productos: [{ id_producto: Number(form.id_producto), cantidad: Number(form.cantidad), precio: Number(form.precio) }],
      });
      if (res.error) throw new Error(res.error);
      onDone();
    } catch (err) { setError(err.message); }
    finally { setLoad(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{ background: "white", borderRadius: "18px", padding: "36px", width: "100%", maxWidth: "460px", border: "2px solid #fed7aa", boxShadow: "0 20px 60px rgba(249,115,22,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontWeight: 700, margin: 0, color: "#111827" }}>Nueva Venta</h3>
          <button onClick={onCancel} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#9ca3af" }}>×</button>
        </div>

        {error && <div style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fca5a5", borderRadius: "8px", padding: "10px", marginBottom: "16px", fontSize: "14px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            {/* Cliente */}
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase" }}>Cliente</label>
              <select value={form.id_cliente} onChange={(e) => setForm({ ...form, id_cliente: e.target.value })} required
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}>
                <option value="">Seleccionar cliente...</option>
                {clientes.map((c) => <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>)}
              </select>
            </div>

            {/* Producto */}
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase" }}>Producto</label>
              <select value={form.id_producto} onChange={(e) => {
                const p = productos.find((x) => x.id_producto === Number(e.target.value));
                setForm({ ...form, id_producto: e.target.value, precio: p ? p.precio : "" });
              }} required
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}>
                <option value="">Seleccionar producto...</option>
                {productos.map((p) => <option key={p.id_producto} value={p.id_producto}>{p.nombre} (stock: {p.stock})</option>)}
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase" }}>Cantidad</label>
              <input type="number" min="1" value={form.cantidad} onChange={(e) => setForm({ ...form, cantidad: e.target.value })} required
                placeholder="Ej: 2"
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")} />
            </div>

            {/* Precio */}
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase" }}>Precio Unit.</label>
              <input type="number" min="0" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required
                placeholder="Auto"
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
          </div>

          {form.cantidad && form.precio && (
            <div style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", fontSize: "14px", color: "#92400e" }}>
              Total estimado: <b>${(Number(form.cantidad) * Number(form.precio)).toFixed(2)}</b>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" disabled={loading} style={{ flex: 1, background: "#ea580c", color: "white", border: "none", borderRadius: "9px", padding: "11px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
              {loading ? "Procesando..." : "Registrar Venta"}
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

function Ventas() {
  const [ventas, setVentas]     = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes]   = useState([]);
  const [modal, setModal]         = useState(false);
  const { usuario }               = useAuth();

  const puedeCrear = ["admin","gerente","vendedor","cajero"].includes(usuario?.rol);

  const cargar = async () => {
    const [v, p, c] = await Promise.all([getVentas(), getProductos(), getClientes()]);
    setVentas(v); setProductos(p); setClientes(c);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0" }}>
      <Navbar titulo="Ventas" backTo="/" />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#111827", margin: 0 }}>Historial de Ventas</h2>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "4px 0 0" }}>{ventas.length} ventas registradas</p>
          </div>
          {puedeCrear && (
            <button onClick={() => setModal(true)}
              style={{ background: "#ea580c", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
              + Nueva Venta
            </button>
          )}
        </div>

        <div style={{ background: "white", border: "1.5px solid #fed7aa", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#fff7ed", borderBottom: "2px solid #fed7aa" }}>
                  {["ID","Fecha","Cliente","Empleado","Total"].map((col) => (
                    <th key={col} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#9a3412", textTransform: "uppercase" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id_venta} style={{ borderBottom: "1px solid #fef3c7" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fff7ed")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#9ca3af", fontFamily: "monospace" }}>#{v.id_venta}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#374151" }}>{new Date(v.fecha).toLocaleDateString("es-GT")}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600, color: "#111827" }}>{v.cliente}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>{v.empleado}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 700, color: "#16a34a" }}>${Number(v.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modal && (
        <FormVenta
          productos={productos}
          clientes={clientes}
          onDone={() => { setModal(false); cargar(); }}
          onCancel={() => setModal(false)}
        />
      )}
    </div>
  );
}

export default Ventas;
