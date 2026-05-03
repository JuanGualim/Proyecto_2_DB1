SELECT 
    v.id_venta,
    v.fecha,
    v.total,
    c.nombre AS cliente,
    e.nombre AS empleado
FROM venta v
JOIN cliente c ON v.id_cliente = c.id_cliente
JOIN empleado e ON v.id_empleado = e.id_empleado;

SELECT 
    p.id_producto,
    p.nombre AS producto,
    p.precio,
    p.stock,
    c.nombre AS categoria,
    pr.nombre AS proveedor
FROM producto p
JOIN categoria c ON p.id_categoria = c.id_categoria
JOIN proveedor pr ON p.id_proveedor = pr.id_proveedor;