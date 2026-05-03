import express from "express";
import { obtenerVentas } from "../controllers/ventaController.js";

const router = express.Router();

router.get("/ventas", obtenerVentas);

export default router;