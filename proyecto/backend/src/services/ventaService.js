import pool from "../config/db.js";

export const getVentas = async () => {
    const [rows] = await pool.query(`
        SELECT 
            v.id_venta,
            v.fecha,
            v.total,
            c.nombre AS cliente,
            e.nombre AS empleado
        FROM venta v
        JOIN cliente c ON v.id_cliente = c.id_cliente
        JOIN empleado e ON v.id_empleado = e.id_empleado
    `);

    return rows;
};