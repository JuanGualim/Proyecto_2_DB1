import express from "express";
import * as rc from "../controllers/reporteController.js";
import { verificarToken, requiereRol } from "../middleware/auth.js";

const router = express.Router();
const soloGerencia = requiereRol("admin","gerente");

router.get("/reporte-ventas",      verificarToken, soloGerencia, rc.obtenerReporteVentas);
router.get("/ventas-join",         verificarToken, soloGerencia, rc.getVentasJoin);
router.get("/productos-detalle",   verificarToken, soloGerencia, rc.getProductosDetalle);
router.get("/detalle-ventas",      verificarToken, soloGerencia, rc.getDetalleVentas);
router.get("/productos-vendidos",  verificarToken, soloGerencia, rc.getProductosVendidos);
router.get("/clientes-top",        verificarToken, soloGerencia, rc.getClientesTop);
router.get("/reporte-clientes",    verificarToken, soloGerencia, rc.getReporteClientes);
router.get("/reporte-productos",   verificarToken, soloGerencia, rc.getReporteProductos);
router.get("/productos-populares", verificarToken, soloGerencia, rc.getProductosPopulares);
router.get("/clientes-elite",      verificarToken, soloGerencia, rc.getClientesElite);

export default router;
