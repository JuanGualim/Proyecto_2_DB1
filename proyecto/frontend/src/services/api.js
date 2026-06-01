const API_URL = "http://localhost:3000/api";

// Agrega el token JWT a cada request
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const get = (path) =>
  fetch(`${API_URL}${path}`, { headers: authHeaders() }).then((r) => r.json());

const post = (path, body) =>
  fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  }).then((r) => r.json());

const put = (path, body) =>
  fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(body),
  }).then((r) => r.json());

const del = (path) =>
  fetch(`${API_URL}${path}`, { method: "DELETE", headers: authHeaders() }).then((r) =>
    r.json()
  );

// ── Auth ─────────────────────────────────────────────────────
export const loginApi = (username, password) =>
  post("/auth/login", { username, password });

// ── Productos ─────────────────────────────────────────────────
export const getProductos    = ()        => get("/productos");
export const createProducto  = (data)    => post("/productos", data);
export const updateProducto  = (id, data) => put(`/productos/${id}`, data);
export const deleteProducto  = (id)      => del(`/productos/${id}`);
export const updateStock     = (id, cantidad) =>
  fetch(`${API_URL}/productos/${id}/stock`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ cantidad }),
  }).then((r) => r.json());

// ── Clientes ─────────────────────────────────────────────────
export const getClientes    = ()         => get("/clientes");
export const createCliente  = (data)     => post("/clientes", data);
export const updateCliente  = (id, data) => put(`/clientes/${id}`, data);
export const deleteCliente  = (id)       => del(`/clientes/${id}`);

// ── Ventas ───────────────────────────────────────────────────
export const getVentas   = ()     => get("/ventas");
export const crearVenta  = (data) => post("/ventas", data);

// ── Reportes ─────────────────────────────────────────────────
export const getReporteVentas    = () => get("/reporte-ventas");
export const getClientesTop      = () => get("/clientes-top");
export const getProductosPopulares = () => get("/productos-populares");
export const getProductosVendidos  = () => get("/productos-vendidos");
export const getReporteClientes    = () => get("/reporte-clientes");
export const getReporteProductos   = () => get("/reporte-productos");
export const getClientesElite      = () => get("/clientes-elite");
