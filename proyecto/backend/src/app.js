import express from "express";
import cors from "cors";
import authRoutes    from "./routes/authRoutes.js";
import ventaRoutes   from "./routes/ventaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import reporteRoutes from "./routes/reporteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", ventaRoutes);
app.use("/api", productoRoutes);
app.use("/api", clienteRoutes);
app.use("/api", reporteRoutes);

app.get("/", (req, res) => res.send("API Proyecto 3 🚀"));

export default app;
