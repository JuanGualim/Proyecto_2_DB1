import { Producto } from "../models/index.js";
import pool from "../config/db.js";

// ── ORM: Listar todos (CRUD #2) ──────────────────────────────
export const getProductos = async () => {
  return await Producto.findAll({ order: [["id_producto", "ASC"]] });
};

// ── ORM: Obtener por ID (CRUD #3) ────────────────────────────
export const getProductoById = async (id) => {
  return await Producto.findByPk(id);
};

// ── SP: Crear producto mediante stored procedure ─────────────
export const createProducto = async (producto) => {
  const { nombre, precio, stock, id_categoria, id_proveedor } = producto;
  const conn = await pool.getConnection();
  try {
    await conn.query("CALL sp_crear_producto(?, ?, ?, ?, ?, @p_id, @p_res)", [
      nombre, precio, stock, id_categoria, id_proveedor,
    ]);
    const [[{ "@p_id": id, "@p_res": resultado }]] = await conn.query(
      "SELECT @p_id, @p_res"
    );
    if (resultado !== "OK") throw new Error(resultado);
    return Number(id);
  } finally {
    conn.release();
  }
};

// ── SP: Actualizar stock mediante stored procedure ───────────
export const updateStock = async (id, cantidad) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("CALL sp_actualizar_stock(?, ?, @p_res)", [id, cantidad]);
    const [[{ "@p_res": resultado }]] = await conn.query("SELECT @p_res");
    if (resultado !== "OK") throw new Error(resultado);
  } finally {
    conn.release();
  }
};

// ── ORM: Actualizar producto (CRUD #4) ───────────────────────
export const updateProducto = async (id, datos) => {
  const { nombre, precio, stock, id_categoria, id_proveedor } = datos;
  await Producto.update(
    { nombre, precio, stock, id_categoria, id_proveedor },
    { where: { id_producto: id } }
  );
};

// ── SP: Eliminar mediante stored procedure ───────────────────
export const deleteProducto = async (id) => {
  const conn = await pool.getConnection();
  try {
    await conn.query("CALL sp_eliminar_producto(?, @p_res)", [id]);
    const [[{ "@p_res": resultado }]] = await conn.query("SELECT @p_res");
    if (resultado !== "OK") throw new Error(resultado);
  } finally {
    conn.release();
  }
};
