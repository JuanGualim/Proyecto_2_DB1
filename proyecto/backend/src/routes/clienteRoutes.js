import express from "express";
import * as ctrl from "../controllers/clienteController.js";
import { verificarToken, requiereRol } from "../middleware/auth.js";

const router = express.Router();

router.get("/clientes",     verificarToken, ctrl.obtenerClientes);
router.get("/clientes/:id", verificarToken, ctrl.obtenerCliente);

// Vendedor, cajero, gerente y admin pueden crear clientes
router.post("/clientes",       verificarToken, requiereRol("admin","gerente","vendedor","cajero"), ctrl.crearCliente);
// Solo admin y gerente pueden modificar/eliminar
router.put("/clientes/:id",    verificarToken, requiereRol("admin","gerente"), ctrl.actualizarCliente);
router.delete("/clientes/:id", verificarToken, requiereRol("admin"), ctrl.eliminarCliente);

export default router;
