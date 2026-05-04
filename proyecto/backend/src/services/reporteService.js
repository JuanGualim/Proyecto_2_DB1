import pool from "../config/db.js";

export const getReporteVentas = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM vista_reporte_ventas"
    );
    return rows;
};


// =====================
// JOINS
// =====================
export const getVentasJoin = async () => {
    const [rows] = await pool.query(`
        SELECT 
            v.id_venta, v.fecha, v.total,
            c.nombre AS cliente,
            e.nombre AS empleado
        FROM venta v
        JOIN cliente c ON v.id_cliente = c.id_cliente
        JOIN empleado e ON v.id_empleado = e.id_empleado
    `);
    return rows;
};

export const getProductosDetalle = async () => {
    const [rows] = await pool.query(`
        SELECT 
            p.id_producto, p.nombre AS producto,
            p.precio, p.stock,
            c.nombre AS categoria,
            pr.nombre AS proveedor
        FROM producto p
        JOIN categoria c ON p.id_categoria = c.id_categoria
        JOIN proveedor pr ON p.id_proveedor = pr.id_proveedor
    `);
    return rows;
};

export const getDetalleVentas = async () => {
    const [rows] = await pool.query(`
        SELECT 
            v.id_venta,
            c.nombre AS cliente,
            p.nombre AS producto,
            dv.cantidad,
            dv.precio_unitario,
            (dv.cantidad * dv.precio_unitario) AS subtotal
        FROM detalle_venta dv
        JOIN venta v ON dv.id_venta = v.id_venta
        JOIN cliente c ON v.id_cliente = c.id_cliente
        JOIN producto p ON dv.id_producto = p.id_producto
    `);
    return rows;
};

// =====================
// SUBQUERIES
// =====================
export const getProductosVendidos = async () => {
    const [rows] = await pool.query(`
        SELECT nombre, precio
        FROM producto
        WHERE id_producto IN (
            SELECT DISTINCT id_producto FROM detalle_venta
        )
    `);
    return rows;
};

export const getClientesTop = async () => {
    const [rows] = await pool.query(`
        SELECT 
            c.nombre,
            COUNT(v.id_venta) AS total_compras
        FROM cliente c
        JOIN venta v ON c.id_cliente = v.id_cliente
        GROUP BY c.id_cliente
        HAVING COUNT(v.id_venta) > (
            SELECT AVG(total_compras)
            FROM (
                SELECT COUNT(id_venta) AS total_compras
                FROM venta
                GROUP BY id_cliente
            ) AS sub
        )
    `);
    return rows;
};

// =====================
// GROUP BY
// =====================
export const getReporteClientes = async () => {
    const [rows] = await pool.query(`
        SELECT 
            c.nombre AS cliente,
            COUNT(v.id_venta) AS cantidad_compras,
            SUM(v.total) AS total_gastado
        FROM cliente c
        JOIN venta v ON c.id_cliente = v.id_cliente
        GROUP BY c.id_cliente, c.nombre
    `);
    return rows;
};

export const getReporteProductos = async () => {
    const [rows] = await pool.query(`
        SELECT 
            p.nombre AS producto,
            SUM(dv.cantidad) AS total_vendido,
            SUM(dv.cantidad * dv.precio_unitario) AS ingresos
        FROM producto p
        JOIN detalle_venta dv ON p.id_producto = dv.id_producto
        GROUP BY p.id_producto, p.nombre
    `);
    return rows;
};

export const getProductosPopulares = async () => {
    const [rows] = await pool.query(`
        SELECT 
            p.nombre AS producto,
            SUM(dv.cantidad) AS total_vendido
        FROM producto p
        JOIN detalle_venta dv ON p.id_producto = dv.id_producto
        GROUP BY p.id_producto, p.nombre
        HAVING SUM(dv.cantidad) > 5
    `);
    return rows;
};

// =====================
// CTE
// =====================
export const getClientesElite = async () => {
    const [rows] = await pool.query(`
        WITH total_por_cliente AS (
            SELECT 
                c.id_cliente,
                c.nombre,
                SUM(v.total) AS total_gastado
            FROM cliente c
            JOIN venta v ON c.id_cliente = v.id_cliente
            GROUP BY c.id_cliente, c.nombre
        )
        SELECT *
        FROM total_por_cliente
        WHERE total_gastado > (
            SELECT AVG(total_gastado)
            FROM total_por_cliente
        )
    `);
    return rows;
};