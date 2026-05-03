-- CONSULTAS CON JOIN
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
JOIN producto p ON dv.id_producto = p.id_producto;

-- SUBQUERIES
SELECT 
    nombre,
    precio
FROM producto
WHERE id_producto IN (
    SELECT DISTINCT id_producto
    FROM detalle_venta
);

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
);