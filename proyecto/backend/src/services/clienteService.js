import { Cliente } from "../models/index.js";
import pool from "../config/db.js";

// ── ORM: Listar todos (CRUD #5) ──────────────────────────────
export const getClientes = async () => {
  return await Cliente.findAll({ order: [["id_cliente", "ASC"]] });
};

// ── ORM: Obtener por ID (CRUD #6) ────────────────────────────
export const getClienteById = async (id) => {
  return await Cliente.findByPk(id);
};

// ── SP: Crear cliente mediante stored procedure ──────────────
export const createCliente = async (cliente) => {
  const { nombre, email, telefono } = cliente;
  const conn = await pool.getConnection();
  try {
    await conn.query("CALL sp_crear_cliente(?, ?, ?, @p_id, @p_res)", [
      nombre, email, telefono,
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

// ── ORM: Actualizar cliente (CRUD #7) ────────────────────────
export const updateCliente = async (id, datos) => {
  const { nombre, email, telefono } = datos;
  await Cliente.update({ nombre, email, telefono }, { where: { id_cliente: id } });
};

// ── ORM: Eliminar cliente (CRUD #8) ──────────────────────────
export const deleteCliente = async (id) => {
  await Cliente.destroy({ where: { id_cliente: id } });
};
