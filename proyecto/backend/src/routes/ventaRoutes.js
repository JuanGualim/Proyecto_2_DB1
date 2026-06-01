import express from "express";
import { obtenerVentas, crearNuevaVenta, ventasPorPeriodo } from "../controllers/ventaController.js";
import { verificarToken, requiereRol } from "../middleware/auth.js";

const router = express.Router();

// Ventas: admin, gerente y cajero pueden ver y crear
router.get("/ventas",           verificarToken, requiereRol("admin","gerente","cajero","vendedor"), obtenerVentas);
router.post("/ventas",          verificarToken, requiereRol("admin","gerente","cajero","vendedor"), crearNuevaVenta);
router.get("/ventas/periodo",   verificarToken, requiereRol("admin","gerente"), ventasPorPeriodo);

export default router;
