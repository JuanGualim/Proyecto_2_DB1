import express from "express";
import { obtenerReporteVentas } from "../controllers/reporteController.js";

const router = express.Router();

router.get("/reporte-ventas", obtenerReporteVentas);

export default router;