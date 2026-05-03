import { getVentas } from "../services/ventaService.js";

export const obtenerVentas = async (req, res) => {
    try {
        const ventas = await getVentas();
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener ventas" });
    }
};