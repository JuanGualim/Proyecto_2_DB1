import { getVentas, crearVenta, getVentasPorPeriodo } from "../services/ventaService.js";

export const obtenerVentas = async (req, res) => {
  try {
    res.json(await getVentas());
  } catch (err) { res.status(500).json({ error: "Error al obtener ventas" }); }
};

export const crearNuevaVenta = async (req, res) => {
  try {
    const ids = await crearVenta(req.body);
    res.json({ mensaje: "Venta(s) creada(s)", ids });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const ventasPorPeriodo = async (req, res) => {
  try {
    const { inicio, fin } = req.query;
    if (!inicio || !fin) return res.status(400).json({ error: "Parámetros inicio y fin requeridos" });
    res.json(await getVentasPorPeriodo(inicio, fin));
  } catch (err) { res.status(500).json({ error: err.message }); }
};
