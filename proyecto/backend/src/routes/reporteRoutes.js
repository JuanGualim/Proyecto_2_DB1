import express from "express";
import { obtenerReporteVentas } from "../controllers/reporteController.js";
import * as rc from "../controllers/reporteController.js";

const router = express.Router();

router.get("/reporte-ventas", obtenerReporteVentas);

// JOIN
router.get("/ventas-join", rc.getVentasJoin);
router.get("/productos-detalle", rc.getProductosDetalle);
router.get("/detalle-ventas", rc.getDetalleVentas);

// SUBQUERY
router.get("/productos-vendidos", rc.getProductosVendidos);
router.get("/clientes-top", rc.getClientesTop);

// GROUP BY
router.get("/reporte-clientes", rc.getReporteClientes);
router.get("/reporte-productos", rc.getReporteProductos);
router.get("/productos-populares", rc.getProductosPopulares);

// CTE
router.get("/clientes-elite", rc.getClientesElite);


export default router;