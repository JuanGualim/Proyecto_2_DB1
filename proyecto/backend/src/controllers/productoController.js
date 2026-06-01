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
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
};


// POST
export const crearProducto = async (req, res) => {
    try {
        const id = await productoService.createProducto(req.body);
        res.json({ mensaje: "Producto creado", id });
    } catch (error) {
        res.status(400).json({ error: "Error al crear producto" });
    }
};

// PUT
export const actualizarProducto = async (req, res) => {
    try {
        await productoService.updateProducto(req.params.id, req.body);
        res.json({ mensaje: "Producto actualizado" });
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar producto" });
    }
};

// DELETE
export const eliminarProducto = async (req, res) => {
    try {
        await productoService.deleteProducto(req.params.id);
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar producto" });
    }
};