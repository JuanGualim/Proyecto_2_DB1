import express from "express";
import cors from "cors";
import ventaRoutes from "./routes/ventaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api", ventaRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

export default app;