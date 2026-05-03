import pool from "../config/db.js";

// Obtener todos
export const getProductos = async () => {
    const [rows] = await pool.query("SELECT * FROM producto");
    return rows;
};

// Obtener uno
export const getProductoById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM producto WHERE id_producto = ?",
        [id]
    );
    return rows[0];
};

// Crear
export const createProducto = async (producto) => {
    const { nombre, precio, stock, id_categoria, id_proveedor } = producto;

    const [result] = await pool.query(
        `INSERT INTO producto (nombre, precio, stock, id_categoria, id_proveedor)
         VALUES (?, ?, ?, ?, ?)`,
        [nombre, precio, stock, id_categoria, id_proveedor]
    );

    return result.insertId;
};

// Actualizar
export const updateProducto = async (id, producto) => {
    const { nombre, precio, stock, id_categoria, id_proveedor } = producto;

    await pool.query(
        `UPDATE producto 
         SET nombre = ?, precio = ?, stock = ?, id_categoria = ?, id_proveedor = ?
         WHERE id_producto = ?`,
        [nombre, precio, stock, id_categoria, id_proveedor, id]
    );
};

// Eliminar
export const deleteProducto = async (id) => {
    await pool.query(
        "DELETE FROM producto WHERE id_producto = ?",
        [id]
    );
};