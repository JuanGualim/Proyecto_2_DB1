import pool from "../config/db.js";

export const getReporteVentas = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM vista_reporte_ventas"
    );
    return rows;
};