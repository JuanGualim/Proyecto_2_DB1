import express from "express";
import { loginHandler, meHandler } from "../controllers/authController.js";
import { verificarToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth/login", loginHandler);
router.get("/auth/me", verificarToken, meHandler);

export default router;
