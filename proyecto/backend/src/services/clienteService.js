import pool from "../config/db.js";

export const getClientes = async () => {
    const [rows] = await pool.query("SELECT * FROM cliente");
    return rows;
};

export const getClienteById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM cliente WHERE id_cliente = ?",
        [id]
    );
    return rows[0];
};

export const createCliente = async (cliente) => {
    const { nombre, email, telefono } = cliente;

    const [result] = await pool.query(
        "INSERT INTO cliente (nombre, email, telefono) VALUES (?, ?, ?)",
        [nombre, email, telefono]
    );

    return result.insertId;
};

export const updateCliente = async (id, cliente) => {
    const { nombre, email, telefono } = cliente;

    await pool.query(
        "UPDATE cliente SET nombre=?, email=?, telefono=? WHERE id_cliente=?",
        [nombre, email, telefono, id]
    );
};

export const deleteCliente = async (id) => {
    await pool.query(
        "DELETE FROM cliente WHERE id_cliente = ?",
        [id]
    );
};