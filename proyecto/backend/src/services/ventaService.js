import pool from "../config/db.js";

// ── ORM: listar ventas (raw SQL con pool) ────────────────────
export const getVentas = async () => {
  const [rows] = await pool.query(`
    SELECT v.id_venta, v.fecha, v.total,
           c.nombre AS cliente, e.nombre AS empleado
    FROM venta v
    JOIN cliente  c ON v.id_cliente  = c.id_cliente
    JOIN empleado e ON v.id_empleado = e.id_empleado
    ORDER BY v.id_venta DESC
  `);
  return rows;
};

// ── SP: Crear venta mediante stored procedure (con ROLLBACK) ─
// El SP sp_crear_venta maneja la transacción y ROLLBACK internamente.
export const crearVenta = async (venta) => {
  const { id_cliente, id_empleado, productos } = venta;
  const conn = await pool.getConnection();
  const resultados = [];

  try {
    for (const item of productos) {
      const { id_producto, cantidad, precio } = item;

      await conn.query(
        "CALL sp_crear_venta(?, ?, ?, ?, ?, @p_id, @p_err)",
        [id_cliente, id_empleado, id_producto, cantidad, precio]
      );

      const [[row]] = await conn.query("SELECT @p_id AS id, @p_err AS err");
      if (row.err !== "OK") {
        throw new Error(row.err);
      }
      resultados.push(Number(row.id));
    }
    return resultados;
  } finally {
    conn.release();
  }
};

// ── SP: Reporte de ventas por periodo ───────────────────────
export const getVentasPorPeriodo = async (fechaInicio, fechaFin) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("CALL sp_reporte_ventas_periodo(?, ?)", [
      fechaInicio,
      fechaFin,
    ]);
    return rows[0]; // MySQL devuelve el result set en rows[0]
  } finally {
    conn.release();
  }
};
