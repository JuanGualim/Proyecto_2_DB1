const API_URL = "http://localhost:3000/api";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

export const getClientes = async () => {
  const res = await fetch(`${API_URL}/clientes`);
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
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export const updateProducto = async (id, producto) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  return res.json();
};

export const getReporteVentas = async () => {
  const res = await fetch(`${API_URL}/reporte-ventas`);
  return res.json();
};


export const getClientesTop = async () => {
  const res = await fetch(`${API_URL}/clientes-top`);
  return res.json();
};

export const getProductosPopulares = async () => {
  const res = await fetch(`${API_URL}/productos-populares`);
  return res.json();
};

export const getProductosVendidos = async () => {
  const res = await fetch(`${API_URL}/productos-vendidos`);
  return res.json();
};

export const getReporteClientes = async () => {
  const res = await fetch(`${API_URL}/reporte-clientes`);
  return res.json();
};

export const getReporteProductos = async () => {
  const res = await fetch(`${API_URL}/reporte-productos`);
  return res.json();
};

export const getClientesElite = async () => {
  const res = await fetch(`${API_URL}/clientes-elite`);
  return res.json();
};

export const crearVenta = async () => {
  const res = await fetch("http://localhost:3000/api/ventas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_cliente: 3,
      id_empleado: 1,
      productos: [
        { id_producto: 1, cantidad: 10, precio: 100 },
        { id_producto: 2, cantidad: 1, precio: 110 },
      ],
    }),
  });

  return res.json();
};