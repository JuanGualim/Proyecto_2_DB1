const API_URL = "http://localhost:3000/api";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

export const getClientes = async () => {
  const res = await fetch(`${API_URL}/clientes`);
  return res.json();
};

export const getReporteVentas = async () => {
  const res = await fetch(`${API_URL}/reporte-ventas`);
  return res.json();
};

export const createProducto = async (producto) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  return res.json();
};

export const deleteProducto = async (id) => {
  const res = await fetch(`http://localhost:3000/api/productos/${id}`, {
    method: "DELETE",
  });

  return res.json();
};