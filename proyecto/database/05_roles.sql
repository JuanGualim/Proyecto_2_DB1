-- =============================================================
-- ROLES EN EL DBMS - PROYECTO 3
-- 5 roles con permisos granulares por tabla y operación
-- =============================================================

DROP ROLE IF EXISTS 'rol_admin', 'rol_gerente', 'rol_vendedor', 'rol_cajero', 'rol_bodeguero';

-- ROL 1: admin — acceso total
CREATE ROLE 'rol_admin';
GRANT ALL PRIVILEGES ON tienda.* TO 'rol_admin';

-- ROL 2: gerente — lectura total + edición de entidades del negocio (sin tabla usuario)
CREATE ROLE 'rol_gerente';
GRANT SELECT ON tienda.categoria     TO 'rol_gerente';
GRANT SELECT ON tienda.proveedor     TO 'rol_gerente';
GRANT SELECT ON tienda.cliente       TO 'rol_gerente';
GRANT SELECT ON tienda.empleado      TO 'rol_gerente';
GRANT SELECT ON tienda.producto      TO 'rol_gerente';
GRANT SELECT ON tienda.venta         TO 'rol_gerente';
GRANT SELECT ON tienda.detalle_venta TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.producto      TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.cliente       TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.empleado      TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.categoria     TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.proveedor     TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.venta         TO 'rol_gerente';
GRANT INSERT, UPDATE ON tienda.detalle_venta TO 'rol_gerente';

-- ROL 3: vendedor — ve catálogos, crea ventas y clientes
CREATE ROLE 'rol_vendedor';
GRANT SELECT ON tienda.producto      TO 'rol_vendedor';
GRANT SELECT ON tienda.cliente       TO 'rol_vendedor';
GRANT SELECT ON tienda.categoria     TO 'rol_vendedor';
GRANT SELECT ON tienda.proveedor     TO 'rol_vendedor';
GRANT SELECT ON tienda.empleado      TO 'rol_vendedor';
GRANT SELECT, INSERT ON tienda.venta         TO 'rol_vendedor';
GRANT SELECT, INSERT ON tienda.detalle_venta TO 'rol_vendedor';
GRANT INSERT ON tienda.cliente TO 'rol_vendedor';

-- ROL 4: cajero — ve productos/clientes, registra ventas
CREATE ROLE 'rol_cajero';
GRANT SELECT ON tienda.producto      TO 'rol_cajero';
GRANT SELECT ON tienda.cliente       TO 'rol_cajero';
GRANT SELECT ON tienda.empleado      TO 'rol_cajero';
GRANT SELECT, INSERT ON tienda.venta         TO 'rol_cajero';
GRANT SELECT, INSERT ON tienda.detalle_venta TO 'rol_cajero';

-- ROL 5: bodeguero — solo ve productos y actualiza stock
CREATE ROLE 'rol_bodeguero';
GRANT SELECT ON tienda.producto  TO 'rol_bodeguero';
GRANT SELECT ON tienda.categoria TO 'rol_bodeguero';
GRANT SELECT ON tienda.proveedor TO 'rol_bodeguero';
GRANT UPDATE (stock) ON tienda.producto TO 'rol_bodeguero';

-- Asignar rol admin al usuario proy3
GRANT 'rol_admin' TO 'proy3'@'%';
SET DEFAULT ROLE 'rol_admin' TO 'proy3'@'%';

FLUSH PRIVILEGES;
