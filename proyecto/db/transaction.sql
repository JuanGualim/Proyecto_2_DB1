START TRANSACTION;

-- Insertar venta
INSERT INTO venta (fecha, total, id_cliente, id_empleado)
VALUES (NOW(), 300, 1, 1);

SET @id_venta = LAST_INSERT_ID();

-- Insertar detalle
INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario)
VALUES (@id_venta, 1, 2, 100);

-- Actualizar stock
UPDATE producto
SET stock = stock - 2
WHERE id_producto = 1;

COMMIT;