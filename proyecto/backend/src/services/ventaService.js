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

export const crearVenta = async (venta) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const { id_cliente, id_empleado, productos } = venta;

        // 1. Crear venta
        const [ventaResult] = await connection.query(
            "INSERT INTO venta (fecha, total, id_cliente, id_empleado) VALUES (NOW(), 0, ?, ?)",
            [id_cliente, id_empleado]
        );

        const id_venta = ventaResult.insertId;

        let total = 0;

        // 2. Insertar detalle + actualizar stock
        for (const item of productos) {
            const { id_producto, cantidad, precio } = item;

            // insertar detalle
            await connection.query(
                "INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
                [id_venta, id_producto, cantidad, precio]
            );

            // actualizar stock
            await connection.query(
                "UPDATE producto SET stock = stock - ? WHERE id_producto = ?",
                [cantidad, id_producto]
            );

            total += cantidad * precio;
        }

        // 3. actualizar total
        await connection.query(
            "UPDATE venta SET total = ? WHERE id_venta = ?",
            [total, id_venta]
        );

        await connection.commit();

        return id_venta;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};