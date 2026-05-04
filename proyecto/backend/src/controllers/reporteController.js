import { getReporteVentas } from "../services/reporteService.js";

export const obtenerReporteVentas = async (req, res) => {
    try {
        const reporte = await getReporteVentas();
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener reporte" });
    }
};