import * as productoService from "../services/productoService.js";

// GET todos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await productoService.getProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

// GET uno
export const obtenerProducto = async (req, res) => {
    try {
        const producto = await productoService.getProductoById(req.params.id);
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
};