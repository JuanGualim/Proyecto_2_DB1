-- =============================================================
-- ROLES EN EL DBMS - PROYECTO 3
-- 5 roles con permisos granulares por tabla y operación
-- =============================================================

-- Eliminar roles si ya existen (para re-ejecución limpia)
DROP ROLE IF EXISTS 'rol_admin', 'rol_gerente', 'rol_vendedor', 'rol_cajero', 'rol_bodeguero';

-- =============================================================
-- ROL 1: admin
-- Acceso total a todas las tablas y operaciones
-- =============================================================
CREATE ROLE 'rol_admin';
GRANT ALL PRIVILEGES ON tienda.* TO 'rol_admin';

-- =============================================================
-- ROL 2: gerente
-- Puede leer todo y modificar productos/clientes/empleados.
-- No puede eliminar ventas ni usuarios.
-- =============================================================
CREATE ROLE 'rol_gerente';
GRANT SELECT ON tienda.* TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.producto   TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.cliente    TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.empleado   TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.categoria  TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.proveedor  TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.venta      TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.detalle_venta TO 'rol_gerente';
-- El gerente NO puede insertar/eliminar usuarios
REVOKE INSERT, UPDATE ON tienda.usuario FROM 'rol_gerente';

-- =============================================================
-- ROL 3: vendedor
-- Puede ver productos, clientes y crear ventas.
-- No puede modificar precios, stock, ni acceder a usuarios.
-- =============================================================
CREATE ROLE 'rol_vendedor';
GRANT SELECT ON tienda.producto      TO 'rol_vendedor';
GRANT SELECT ON tienda.cliente       TO 'rol_vendedor';
GRANT SELECT ON tienda.categoria     TO 'rol_vendedor';
GRANT SELECT ON tienda.proveedor     TO 'rol_vendedor';
GRANT SELECT ON tienda.empleado      TO 'rol_vendedor';
GRANT SELECT, INSERT ON tienda.venta         TO 'rol_vendedor';
GRANT SELECT, INSERT ON tienda.detalle_venta TO 'rol_vendedor';
-- Vendedor puede insertar clientes nuevos
GRANT INSERT ON tienda.cliente TO 'rol_vendedor';

-- =============================================================
-- ROL 4: cajero
-- Solo puede ver ventas/detalle y leer productos.
-- No puede crear ni modificar ninguna entidad excepto cobrar (insertar venta).
-- =============================================================
CREATE ROLE 'rol_cajero';
GRANT SELECT ON tienda.producto      TO 'rol_cajero';
GRANT SELECT ON tienda.cliente       TO 'rol_cajero';
GRANT SELECT ON tienda.venta         TO 'rol_cajero';
GRANT SELECT ON tienda.detalle_venta TO 'rol_cajero';
GRANT SELECT ON tienda.empleado      TO 'rol_cajero';
-- El cajero puede registrar ventas (INSERT) pero no modificarlas
GRANT INSERT ON tienda.venta         TO 'rol_cajero';
GRANT INSERT ON tienda.detalle_venta TO 'rol_cajero';

-- =============================================================
-- ROL 5: bodeguero
-- Puede ver y actualizar stock de productos.
-- No puede ver ventas ni usuarios, ni precios.
-- =============================================================
CREATE ROLE 'rol_bodeguero';
GRANT SELECT ON tienda.producto   TO 'rol_bodeguero';
GRANT SELECT ON tienda.categoria  TO 'rol_bodeguero';
GRANT SELECT ON tienda.proveedor  TO 'rol_bodeguero';
-- Solo puede actualizar stock (no precio)
GRANT UPDATE (stock) ON tienda.producto TO 'rol_bodeguero';

-- =============================================================
-- Asignar roles al usuario proy3 según su nivel (admin total)
-- =============================================================
GRANT 'rol_admin' TO 'proy3'@'%';
SET DEFAULT ROLE 'rol_admin' TO 'proy3'@'%';

FLUSH PRIVILEGES;