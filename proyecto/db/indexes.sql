-- =========================
-- ÍNDICES EN PRODUCTO
-- =========================
CREATE INDEX idx_producto_categoria 
ON producto(id_categoria);

CREATE INDEX idx_producto_proveedor 
ON producto(id_proveedor);

-- =========================
-- ÍNDICES EN VENTA
-- =========================
CREATE INDEX idx_venta_cliente 
ON venta(id_cliente);

CREATE INDEX idx_venta_empleado 
ON venta(id_empleado);

-- =========================
-- ÍNDICES EN DETALLE_VENTA
-- =========================
CREATE INDEX idx_detalle_venta 
ON detalle_venta(id_venta);

CREATE INDEX idx_detalle_producto 
ON detalle_venta(id_producto);