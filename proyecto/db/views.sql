CREATE VIEW vista_reporte_ventas AS
SELECT 
    v.id_venta,
    v.fecha,
    c.nombre AS cliente,
    e.nombre AS empleado,
    p.nombre AS producto,
    dv.cantidad,
    dv.precio_unitario,
    (dv.cantidad * dv.precio_unitario) AS subtotal
FROM venta v
JOIN cliente c ON v.id_cliente = c.id_cliente
JOIN empleado e ON v.id_empleado = e.id_empleado
JOIN detalle_venta dv ON v.id_venta = dv.id_venta
JOIN producto p ON dv.id_producto = p.id_producto;