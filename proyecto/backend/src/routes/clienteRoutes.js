import express from "express";
import * as clienteController from "../controllers/clienteController.js";

const router = express.Router();

router.get("/clientes", clienteController.obtenerClientes);
router.get("/clientes/:id", clienteController.obtenerCliente);
router.post("/clientes", clienteController.crearCliente);
router.put("/clientes/:id", clienteController.actualizarCliente);
router.delete("/clientes/:id", clienteController.eliminarCliente);

export default router;