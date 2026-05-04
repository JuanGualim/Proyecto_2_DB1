import express from "express";
import { obtenerVentas } from "../controllers/ventaController.js";
import { crearNuevaVenta } from "../controllers/ventaController.js";

const router = express.Router();

router.get("/ventas", obtenerVentas);
router.post("/ventas", crearNuevaVenta);

export default router;