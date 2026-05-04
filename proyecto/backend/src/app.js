import express from "express";
import cors from "cors";
import ventaRoutes from "./routes/ventaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api", ventaRoutes);
app.use("/api", productoRoutes);
app.use("/api", clienteRoutes);


app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

export default app;