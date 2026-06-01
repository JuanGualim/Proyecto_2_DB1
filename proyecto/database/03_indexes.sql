-- =========================
-- ÍNDICES EN PRODUCTO
-- =========================
CREATE INDEX IF NOT EXISTS idx_producto_categoria 
ON producto(id_categoria);

CREATE INDEX IF NOT EXISTS idx_producto_proveedor 
ON producto(id_proveedor);

-- =========================
-- ÍNDICES EN VENTA
-- =========================
CREATE INDEX IF NOT EXISTS idx_venta_cliente 
ON venta(id_cliente);

CREATE INDEX IF NOT EXISTS idx_venta_empleado 
ON venta(id_empleado);

-- =========================
-- ÍNDICES EN DETALLE_VENTA
-- =========================
CREATE INDEX IF NOT EXISTS idx_detalle_venta 
ON detalle_venta(id_venta);

CREATE INDEX IF NOT EXISTS idx_detalle_producto 
ON detalle_venta(id_producto);