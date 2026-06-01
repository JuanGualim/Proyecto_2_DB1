import { useEffect, useState } from "react";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function FormCliente({ onDone, onCancel, clienteEditar }) {
  const [form, setForm]   = useState({ nombre: "", email: "", telefono: "" });
  const [error, setError] = useState("");

  useEffect(() => { if (clienteEditar) setForm(clienteEditar); }, [clienteEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    try {
      const res = clienteEditar
        ? await updateCliente(clienteEditar.id_cliente, form)
        : await createCliente(form);
      if (res.error) throw new Error(res.error);
      onDone();
    } catch (err) { setError(err.message); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{ background: "white", borderRadius: "18px", padding: "36px", width: "100%", maxWidth: "420px", border: "2px solid #fed7aa" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontWeight: 700, margin: 0 }}>{clienteEditar ? "Editar Cliente" : "Nuevo Cliente"}</h3>
          <button onClick={onCancel} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#9ca3af" }}>×</button>
        </div>
        {error && <div style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fca5a5", borderRadius: "8px", padding: "10px", marginBottom: "16px", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { name: "nombre",   label: "Nombre",    type: "text" },
            { name: "email",    label: "Email",     type: "email" },
            { name: "telefono", label: "Teléfono",  type: "text" },
          ].map(({ name, label, type }) => (
            <div key={name} style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#6b7280", marginBottom: "5px", textTransform: "uppercase" }}>{label}</label>
              <input type={type} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} required
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")} />
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button type="submit" style={{ flex: 1, background: "#ea580c", color: "white", border: "none", borderRadius: "9px", padding: "11px", fontWeight: 700, cursor: "pointer" }}>
              {clienteEditar ? "Guardar" : "Crear"}
            </button>
            <button type="button" onClick={onCancel} style={{ padding: "11px 18px", background: "#f3f4f6", color: "#6b7280", border: "none", borderRadius: "9px", fontWeight: 600, cursor: "pointer" }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Clientes() {
  const [clientes, setClientes]           = useState([]);
  const [clienteEditar, setClienteEditar] = useState(null);
  const [modo, setModo]                   = useState(null);
  const { usuario }                       = useAuth();

  const puedeCrear    = ["admin","gerente","vendedor","cajero"].includes(usuario?.rol);
  const puedeEditar   = ["admin","gerente"].includes(usuario?.rol);
  const puedeEliminar = usuario?.rol === "admin";

  const cargar = async () => setClientes(await getClientes());
  useEffect(() => { cargar(); }, []);

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Eliminar cliente "${nombre}"?`)) return;
    await deleteCliente(id);
    cargar();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0" }}>
      <Navbar titulo="Clientes" backTo="/" />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#111827", margin: 0 }}>Clientes</h2>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "4px 0 0" }}>{clientes.length} registros</p>
          </div>
          {puedeCrear && (
            <button onClick={() => { setClienteEditar(null); setModo("crear"); }}
              style={{ background: "#ea580c", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
              + Nuevo Cliente
            </button>
          )}
        </div>

        <div style={{ background: "white", border: "1.5px solid #fed7aa", borderRadius: "16px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fff7ed", borderBottom: "2px solid #fed7aa" }}>
                {["ID","Nombre","Email","Teléfono", (puedeEditar || puedeEliminar) ? "Acciones" : ""].map((col, i) => (
                  <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#9a3412", textTransform: "uppercase" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id_cliente} style={{ borderBottom: "1px solid #fef3c7" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fff7ed")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#9ca3af", fontFamily: "monospace" }}>#{c.id_cliente}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 600, color: "#111827" }}>{c.nombre}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>{c.email}</td>
                  <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>{c.telefono}</td>
                  {(puedeEditar || puedeEliminar) && (
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {puedeEditar && (
                          <button onClick={() => { setClienteEditar(c); setModo("editar"); }}
                            style={{ background: "#fff7ed", color: "#ea580c", border: "1.5px solid #fed7aa", borderRadius: "7px", padding: "5px 12px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                            Editar
                          </button>
                        )}
                        {puedeEliminar && (
                          <button onClick={() => handleDelete(c.id_cliente, c.nombre)}
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

      {(modo === "crear" || modo === "editar") && (
        <FormCliente
          clienteEditar={clienteEditar}
          onDone={() => { setModo(null); setClienteEditar(null); cargar(); }}
          onCancel={() => { setModo(null); setClienteEditar(null); }}
        />
      )}
    </div>
  );
}

export default Clientes;
