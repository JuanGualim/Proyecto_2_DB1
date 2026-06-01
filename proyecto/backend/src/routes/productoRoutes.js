import express from "express";
import * as ctrl from "../controllers/productoController.js";
import { verificarToken, requiereRol } from "../middleware/auth.js";

const router = express.Router();

// Cualquier usuario autenticado puede ver productos
router.get("/productos",     verificarToken, ctrl.obtenerProductos);
router.get("/productos/:id", verificarToken, ctrl.obtenerProducto);

// Solo admin y gerente pueden crear/editar
router.post("/productos",        verificarToken, requiereRol("admin","gerente"), ctrl.crearProducto);
router.put("/productos/:id",     verificarToken, requiereRol("admin","gerente"), ctrl.actualizarProducto);
// Bodeguero puede actualizar stock
router.patch("/productos/:id/stock", verificarToken, requiereRol("admin","gerente","bodeguero"), ctrl.actualizarStock);
// Solo admin puede eliminar
router.delete("/productos/:id",  verificarToken, requiereRol("admin"), ctrl.eliminarProducto);

export default router;
