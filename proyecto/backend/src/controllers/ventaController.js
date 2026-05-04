import { getVentas } from "../services/ventaService.js";
import { crearVenta } from "../services/ventaService.js";

export const obtenerVentas = async (req, res) => {
    try {
        const ventas = await getVentas();
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener ventas" });
    }
};


export const crearNuevaVenta = async (req, res) => {
    try {
        const id = await crearVenta(req.body);
        res.json({ mensaje: "Venta creada", id });
    } catch (error) {
        res.status(500).json({ error: "Error en la transacción" });
    }
};