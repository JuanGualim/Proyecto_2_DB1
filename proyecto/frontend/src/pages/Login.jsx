import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROL_COLORS = {
  admin:      { bg: "#fef2f2", border: "#fca5a5", text: "#dc2626", label: "Admin" },
  gerente:    { bg: "#fff7ed", border: "#fdba74", text: "#ea580c", label: "Gerente" },
  vendedor:   { bg: "#f0fdf4", border: "#86efac", text: "#16a34a", label: "Vendedor" },
  cajero:     { bg: "#eff6ff", border: "#93c5fd", text: "#2563eb", label: "Cajero" },
  bodeguero:  { bg: "#faf5ff", border: "#c4b5fd", text: "#7c3aed", label: "Bodeguero" },
};

const CUENTAS_PRUEBA = [
  { username: "admin",     password: "admin123",     rol: "admin" },
  { username: "gerente",   password: "gerente123",   rol: "gerente" },
  { username: "vendedor",  password: "vendedor123",  rol: "vendedor" },
  { username: "cajero",    password: "cajero123",    rol: "cajero" },
  { username: "bodeguero", password: "bodeguero123", rol: "bodeguero" },
];

function Login() {
  const [form, setForm]     = useState({ username: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoad]  = useState(false);
  const { login }           = useAuth();
  const navigate            = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoad(true);
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally { setLoad(false); }
  };

  const fillCredentials = (u, p) => setForm({ username: u, password: p });

  return (
    <div style={{ minHeight: "100vh", background: "#fdf6f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      {/* Logo */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, background: "#ea580c", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "1.6rem", color: "#1f2937", margin: 0 }}>Tienda</h1>
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "4px 0 0" }}>Sistema de gestión — Proyecto 3</p>
      </div>

      {/* Card login */}
      <div style={{ background: "white", border: "2px solid #fed7aa", borderRadius: "20px", padding: "36px", width: "100%", maxWidth: "420px", boxShadow: "0 8px 32px rgba(249,115,22,0.1)" }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: "#111827", marginBottom: "24px" }}>Iniciar sesión</h2>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { name: "username", label: "Usuario", placeholder: "ej: admin", type: "text" },
            { name: "password", label: "Contraseña", placeholder: "••••••••", type: "password" },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
              <input
                type={type}
                value={form[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                placeholder={placeholder}
                required
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e)  => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", background: loading ? "#fed7aa" : "#ea580c", color: "white", border: "none", borderRadius: "10px", padding: "12px", fontWeight: 700, fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px", transition: "background 0.15s" }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Cuentas de prueba */}
        <div style={{ marginTop: "28px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>Cuentas de prueba</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {CUENTAS_PRUEBA.map(({ username, password, rol }) => {
              const c = ROL_COLORS[rol];
              return (
                <button
                  key={username}
                  type="button"
                  onClick={() => fillCredentials(username, password)}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: "8px", cursor: "pointer", textAlign: "left", transition: "opacity 0.1s" }}
                >
                  <span style={{ background: c.border, color: c.text, borderRadius: "5px", padding: "2px 8px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", flexShrink: 0 }}>{c.label}</span>
                  <span style={{ fontSize: "13px", color: "#374151", fontFamily: "monospace" }}>{username} / {password}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
