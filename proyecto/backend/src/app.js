import express from "express";
import cors from "cors";
import ventaRoutes from "./routes/ventaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api", ventaRoutes);
app.use("/api", productoRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

export default app;