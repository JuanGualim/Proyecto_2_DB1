-- =========================
-- TABLA: CATEGORIA
-- =========================
CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- =========================
-- TABLA: PROVEEDOR
-- =========================
CREATE TABLE IF NOT EXISTS proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100)
);

-- =========================
-- TABLA: CLIENTE
-- =========================
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20)
);

-- =========================
-- TABLA: EMPLEADO
-- =========================
CREATE TABLE IF NOT EXISTS empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    puesto VARCHAR(50) NOT NULL
);

-- =========================
-- TABLA: PRODUCTO
-- =========================
CREATE TABLE IF NOT EXISTS producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT NOT NULL,
    id_proveedor INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor)
);

-- =========================
-- TABLA: VENTA
-- =========================
CREATE TABLE IF NOT EXISTS venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL,
    total DECIMAL(10,2),
    id_cliente INT NOT NULL,
    id_empleado INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado)
);

-- =========================
-- TABLA: DETALLE_VENTA
-- =========================
CREATE TABLE IF NOT EXISTS detalle_venta (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- =========================
-- TABLA: USUARIOS (nueva para Proyecto 3)
-- =========================
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('admin','gerente','vendedor','cajero','bodeguero') NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- =====================
-- CATEGORIA
-- =====================
INSERT INTO categoria (nombre) VALUES
('Electrónica'),('Ropa'),('Hogar'),('Alimentos'),('Deportes'),
('Juguetes'),('Libros'),('Tecnología'),('Accesorios'),('Salud'),
('Belleza'),('Automotriz'),('Mascotas'),('Jardinería'),('Muebles'),
('Oficina'),('Videojuegos'),('Instrumentos'),('Fotografía'),('Viajes'),
('Calzado'),('Bebidas'),('Ferretería'),('Construcción'),('Arte');

-- =====================
-- PROVEEDOR
-- =====================
INSERT INTO proveedor (nombre, telefono, email) VALUES
('Proveedor 1','10000001','p1@mail.com'),('Proveedor 2','10000002','p2@mail.com'),
('Proveedor 3','10000003','p3@mail.com'),('Proveedor 4','10000004','p4@mail.com'),
('Proveedor 5','10000005','p5@mail.com'),('Proveedor 6','10000006','p6@mail.com'),
('Proveedor 7','10000007','p7@mail.com'),('Proveedor 8','10000008','p8@mail.com'),
('Proveedor 9','10000009','p9@mail.com'),('Proveedor 10','10000010','p10@mail.com'),
('Proveedor 11','10000011','p11@mail.com'),('Proveedor 12','10000012','p12@mail.com'),
('Proveedor 13','10000013','p13@mail.com'),('Proveedor 14','10000014','p14@mail.com'),
('Proveedor 15','10000015','p15@mail.com'),('Proveedor 16','10000016','p16@mail.com'),
('Proveedor 17','10000017','p17@mail.com'),('Proveedor 18','10000018','p18@mail.com'),
('Proveedor 19','10000019','p19@mail.com'),('Proveedor 20','10000020','p20@mail.com'),
('Proveedor 21','10000021','p21@mail.com'),('Proveedor 22','10000022','p22@mail.com'),
('Proveedor 23','10000023','p23@mail.com'),('Proveedor 24','10000024','p24@mail.com'),
('Proveedor 25','10000025','p25@mail.com');

-- =====================
-- CLIENTE
-- =====================
INSERT INTO cliente (nombre, email, telefono) VALUES
('Cliente 1','c1@mail.com','10000001'),('Cliente 2','c2@mail.com','10000002'),
('Cliente 3','c3@mail.com','10000003'),('Cliente 4','c4@mail.com','10000004'),
('Cliente 5','c5@mail.com','10000005'),('Cliente 6','c6@mail.com','10000006'),
('Cliente 7','c7@mail.com','10000007'),('Cliente 8','c8@mail.com','10000008'),
('Cliente 9','c9@mail.com','10000009'),('Cliente 10','c10@mail.com','10000010'),
('Cliente 11','c11@mail.com','10000011'),('Cliente 12','c12@mail.com','10000012'),
('Cliente 13','c13@mail.com','10000013'),('Cliente 14','c14@mail.com','10000014'),
('Cliente 15','c15@mail.com','10000015'),('Cliente 16','c16@mail.com','10000016'),
('Cliente 17','c17@mail.com','10000017'),('Cliente 18','c18@mail.com','10000018'),
('Cliente 19','c19@mail.com','10000019'),('Cliente 20','c20@mail.com','10000020'),
('Cliente 21','c21@mail.com','10000021'),('Cliente 22','c22@mail.com','10000022'),
('Cliente 23','c23@mail.com','10000023'),('Cliente 24','c24@mail.com','10000024'),
('Cliente 25','c25@mail.com','10000025');

-- =====================
-- EMPLEADO
-- =====================
INSERT INTO empleado (nombre, puesto) VALUES
('Pedro','Cajero'),('Laura','Vendedor'),('Miguel','Supervisor'),
('Sofía','Cajero'),('Andrés','Vendedor'),
('Empleado 6','Cajero'),('Empleado 7','Vendedor'),('Empleado 8','Supervisor'),
('Empleado 9','Cajero'),('Empleado 10','Vendedor'),
('Empleado 11','Cajero'),('Empleado 12','Vendedor'),('Empleado 13','Supervisor'),
('Empleado 14','Cajero'),('Empleado 15','Vendedor'),
('Empleado 16','Cajero'),('Empleado 17','Vendedor'),('Empleado 18','Supervisor'),
('Empleado 19','Cajero'),('Empleado 20','Vendedor'),
('Empleado 21','Cajero'),('Empleado 22','Vendedor'),('Empleado 23','Supervisor'),
('Empleado 24','Cajero'),('Empleado 25','Vendedor');

-- =====================
-- PRODUCTO
-- =====================
INSERT INTO producto (nombre, precio, stock, id_categoria, id_proveedor) VALUES
('Producto 1',100,10,1,1),('Producto 2',110,15,2,2),('Producto 3',120,20,3,3),
('Producto 4',130,25,4,4),('Producto 5',140,30,5,5),('Producto 6',150,10,1,1),
('Producto 7',160,15,2,2),('Producto 8',170,20,3,3),('Producto 9',180,25,4,4),
('Producto 10',190,30,5,5),('Producto 11',200,10,1,1),('Producto 12',210,15,2,2),
('Producto 13',220,20,3,3),('Producto 14',230,25,4,4),('Producto 15',240,30,5,5),
('Producto 16',250,10,1,1),('Producto 17',260,15,2,2),('Producto 18',270,20,3,3),
('Producto 19',280,25,4,4),('Producto 20',290,30,5,5),('Producto 21',300,10,1,1),
('Producto 22',310,15,2,2),('Producto 23',320,20,3,3),('Producto 24',330,25,4,4),
('Producto 25',340,30,5,5);

-- =====================
-- VENTA
-- =====================
INSERT INTO venta (fecha, total, id_cliente, id_empleado) VALUES
(NOW(),100,1,1),(NOW(),200,2,2),(NOW(),300,3,3),(NOW(),400,4,4),(NOW(),500,5,5),
(NOW(),600,6,1),(NOW(),700,7,2),(NOW(),800,8,3),(NOW(),900,9,4),(NOW(),1000,10,5),
(NOW(),1100,11,1),(NOW(),1200,12,2),(NOW(),1300,13,3),(NOW(),1400,14,4),(NOW(),1500,15,5),
(NOW(),1600,16,1),(NOW(),1700,17,2),(NOW(),1800,18,3),(NOW(),1900,19,4),(NOW(),2000,20,5),
(NOW(),2100,21,1),(NOW(),2200,22,2),(NOW(),2300,23,3),(NOW(),2400,24,4),(NOW(),2500,25,5),
(NOW(),500,1,1),(NOW(),600,2,2),(NOW(),700,3,3),(NOW(),800,4,4),(NOW(),900,5,5),
(NOW(),1000,1,1),(NOW(),1000,2,2),(NOW(),1000,3,3),(NOW(),1000,4,4),(NOW(),1000,5,5),
(NOW(),1000,6,1),(NOW(),1000,7,2),(NOW(),1000,8,3),(NOW(),1000,9,4),(NOW(),1000,10,5);

-- =====================
-- DETALLE_VENTA
-- =====================
INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES
(1,1,1,100),(1,2,1,110),(2,3,2,120),(2,4,1,130),(3,5,1,140),(3,6,2,150),
(4,7,1,160),(4,8,2,170),(5,9,1,180),(5,10,2,190),(6,11,1,200),(6,12,2,210),
(7,13,1,220),(7,14,2,230),(8,15,1,240),(8,16,2,250),(9,17,1,260),(9,18,2,270),
(10,19,1,280),(10,20,2,290),(11,21,1,300),(11,22,2,310),(12,23,1,320),(12,24,2,330),
(13,25,1,340),(13,1,2,100),(14,2,1,110),(14,3,2,120),(15,4,1,130),(15,5,2,140),
(16,6,1,150),(16,7,2,160),(17,8,1,170),(17,9,2,180),(18,10,1,190),(18,11,2,200),
(19,12,1,210),(19,13,2,220),(20,14,1,230),(20,15,2,240),(21,16,1,250),(21,17,2,260),
(22,18,1,270),(22,19,2,280),(23,20,1,290),(23,21,2,300),(24,22,1,310),(24,23,2,320),
(25,24,1,330),(25,25,2,340),(26,1,2,100),(26,2,2,110),(27,1,3,100),(27,3,2,120),
(28,1,2,100),(28,2,1,110),(29,1,2,100),(29,3,2,120),(30,1,3,100),(30,2,2,110),
(31,1,3,100),(32,1,3,100),(33,1,2,100),(34,1,2,100),(35,1,2,100),
(36,2,3,110),(37,2,2,110),(38,2,2,110),(39,2,2,110),(40,2,2,110);

-- =====================
-- USUARIOS (uno por rol)
-- Contraseñas hasheadas con bcrypt (password = nombre del rol)
-- admin:admin123, gerente:gerente123, vendedor:vendedor123, cajero:cajero123, bodeguero:bodeguero123
-- =====================
-- Contraseñas: admin=admin123, gerente=gerente123, vendedor=vendedor123, cajero=cajero123, bodeguero=bodeguero123
INSERT INTO usuario (username, password_hash, rol, nombre) VALUES
('admin',     '$2b$10$VuIV/NSUXPiqPtphj3kHteX9rAAcEdmwBO79iZriM8cYeaAJtKsBi', 'admin',     'Administrador'),
('gerente',   '$2b$10$N/ZZ8iPzGjPH002C3m5JH..DN7kNyl7iOsIjBnLtWyLaOyN04/tPC', 'gerente',   'Gerente General'),
('vendedor',  '$2b$10$jj/CgZknn0P5fq6XkiWnM.57xdqkM6BSXnXuGJy8oIXzUUroOPj4i', 'vendedor',  'Vendedor Uno'),
('cajero',    '$2b$10$t6WQtuzyeG6/bhZ5EcrQbO/rX76vYEe9vrcjj4cQAm4VX1tKtf0fm', 'cajero',    'Cajero Uno'),
('bodeguero', '$2b$10$irubbkUh9USup4vXd9Wn/.rnsOg/mPcH705zDn1NBtxorCSof261C', 'bodeguero', 'Bodeguero Uno');
CREATE INDEX IF NOT EXISTS idx_producto_categoria ON producto(id_categoria);
CREATE INDEX IF NOT EXISTS idx_producto_proveedor ON producto(id_proveedor);
CREATE INDEX IF NOT EXISTS idx_venta_cliente ON venta(id_cliente);
CREATE INDEX IF NOT EXISTS idx_venta_empleado ON venta(id_empleado);
CREATE INDEX IF NOT EXISTS idx_detalle_venta ON detalle_venta(id_venta);
CREATE INDEX IF NOT EXISTS idx_detalle_producto ON detalle_venta(id_producto);
CREATE OR REPLACE VIEW vista_reporte_ventas AS
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
-- =============================================================
-- STORED PROCEDURES - PROYECTO 3
-- =============================================================

DELIMITER $$

-- =============================================================
-- SP 1: sp_crear_venta
-- Crea una venta completa con transacción explícita y ROLLBACK.
-- Valida stock antes de proceder.
-- Parámetros de SALIDA: p_id_venta, p_error_msg
-- =============================================================
DROP PROCEDURE IF EXISTS sp_crear_venta$$
CREATE PROCEDURE sp_crear_venta(
    IN  p_id_cliente   INT,
    IN  p_id_empleado  INT,
    IN  p_id_producto  INT,
    IN  p_cantidad     INT,
    IN  p_precio       DECIMAL(10,2),
    OUT p_id_venta     INT,
    OUT p_error_msg    VARCHAR(255)
)
BEGIN
    DECLARE v_stock_actual INT DEFAULT 0;
    DECLARE v_total        DECIMAL(10,2) DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_id_venta  = -1;
        SET p_error_msg = 'Error interno en la transacción. Se hizo ROLLBACK.';
    END;

    SET p_id_venta  = -1;
    SET p_error_msg = '';

    -- Verificar stock disponible
    SELECT stock INTO v_stock_actual
    FROM producto
    WHERE id_producto = p_id_producto
    FOR UPDATE;

    IF v_stock_actual < p_cantidad THEN
        SET p_error_msg = CONCAT('Stock insuficiente. Disponible: ', v_stock_actual);
        LEAVE sp_crear_venta;
    END IF;

    START TRANSACTION;

        -- Calcular total
        SET v_total = p_cantidad * p_precio;

        -- Insertar encabezado de venta
        INSERT INTO venta (fecha, total, id_cliente, id_empleado)
        VALUES (NOW(), v_total, p_id_cliente, p_id_empleado);

        SET p_id_venta = LAST_INSERT_ID();

        -- Insertar detalle
        INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario)
        VALUES (p_id_venta, p_id_producto, p_cantidad, p_precio);

        -- Descontar stock
        UPDATE producto
        SET stock = stock - p_cantidad
        WHERE id_producto = p_id_producto;

    COMMIT;
    SET p_error_msg = 'OK';
END$$

-- =============================================================
-- SP 2: sp_actualizar_stock
-- Actualiza el stock de un producto con validación.
-- Parámetro de salida: éxito o mensaje de error.
-- =============================================================
DROP PROCEDURE IF EXISTS sp_actualizar_stock$$
CREATE PROCEDURE sp_actualizar_stock(
    IN  p_id_producto INT,
    IN  p_cantidad    INT,
    OUT p_resultado   VARCHAR(100)
)
BEGIN
    DECLARE v_existe INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 'ERROR: Fallo al actualizar stock.';
    END;

    SELECT COUNT(*) INTO v_existe FROM producto WHERE id_producto = p_id_producto;

    IF v_existe = 0 THEN
        SET p_resultado = 'ERROR: Producto no encontrado.';
    ELSE
        START TRANSACTION;
            UPDATE producto SET stock = stock + p_cantidad WHERE id_producto = p_id_producto;
        COMMIT;
        SET p_resultado = 'OK';
    END IF;
END$$

-- =============================================================
-- SP 3: sp_crear_producto
-- Inserta un nuevo producto validando que categoría y proveedor existan.
-- =============================================================
DROP PROCEDURE IF EXISTS sp_crear_producto$$
CREATE PROCEDURE sp_crear_producto(
    IN  p_nombre       VARCHAR(100),
    IN  p_precio       DECIMAL(10,2),
    IN  p_stock        INT,
    IN  p_id_categoria INT,
    IN  p_id_proveedor INT,
    OUT p_id_nuevo     INT,
    OUT p_resultado    VARCHAR(100)
)
BEGIN
    DECLARE v_cat INT DEFAULT 0;
    DECLARE v_prov INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_id_nuevo  = -1;
        SET p_resultado = 'ERROR: Excepción SQL al crear producto.';
    END;

    SELECT COUNT(*) INTO v_cat FROM categoria WHERE id_categoria = p_id_categoria;
    SELECT COUNT(*) INTO v_prov FROM proveedor WHERE id_proveedor = p_id_proveedor;

    IF v_cat = 0 THEN
        SET p_id_nuevo = -1;
        SET p_resultado = 'ERROR: Categoría no existe.';
    ELSEIF v_prov = 0 THEN
        SET p_id_nuevo = -1;
        SET p_resultado = 'ERROR: Proveedor no existe.';
    ELSEIF p_precio <= 0 THEN
        SET p_id_nuevo = -1;
        SET p_resultado = 'ERROR: El precio debe ser mayor a 0.';
    ELSE
        START TRANSACTION;
            INSERT INTO producto (nombre, precio, stock, id_categoria, id_proveedor)
            VALUES (p_nombre, p_precio, p_stock, p_id_categoria, p_id_proveedor);
            SET p_id_nuevo = LAST_INSERT_ID();
        COMMIT;
        SET p_resultado = 'OK';
    END IF;
END$$

-- =============================================================
-- SP 4: sp_eliminar_producto
-- Elimina un producto solo si no tiene ventas asociadas.
-- =============================================================
DROP PROCEDURE IF EXISTS sp_eliminar_producto$$
CREATE PROCEDURE sp_eliminar_producto(
    IN  p_id_producto INT,
    OUT p_resultado   VARCHAR(100)
)
BEGIN
    DECLARE v_ventas INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 'ERROR: Excepción SQL al eliminar producto.';
    END;

    SELECT COUNT(*) INTO v_ventas
    FROM detalle_venta
    WHERE id_producto = p_id_producto;

    IF v_ventas > 0 THEN
        SET p_resultado = 'ERROR: El producto tiene ventas asociadas y no puede eliminarse.';
    ELSE
        START TRANSACTION;
            DELETE FROM producto WHERE id_producto = p_id_producto;
        COMMIT;
        SET p_resultado = 'OK';
    END IF;
END$$

-- =============================================================
-- SP 5: sp_crear_cliente
-- Inserta un cliente validando que el email no esté duplicado.
-- =============================================================
DROP PROCEDURE IF EXISTS sp_crear_cliente$$
CREATE PROCEDURE sp_crear_cliente(
    IN  p_nombre   VARCHAR(100),
    IN  p_email    VARCHAR(100),
    IN  p_telefono VARCHAR(20),
    OUT p_id_nuevo INT,
    OUT p_resultado VARCHAR(100)
)
BEGIN
    DECLARE v_duplicado INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_id_nuevo  = -1;
        SET p_resultado = 'ERROR: Excepción SQL al crear cliente.';
    END;

    SELECT COUNT(*) INTO v_duplicado FROM cliente WHERE email = p_email;

    IF v_duplicado > 0 THEN
        SET p_id_nuevo  = -1;
        SET p_resultado = 'ERROR: Ya existe un cliente con ese email.';
    ELSE
        START TRANSACTION;
            INSERT INTO cliente (nombre, email, telefono)
            VALUES (p_nombre, p_email, p_telefono);
            SET p_id_nuevo = LAST_INSERT_ID();
        COMMIT;
        SET p_resultado = 'OK';
    END IF;
END$$

-- =============================================================
-- SP 6: sp_reporte_ventas_periodo
-- Genera un resumen de ventas entre dos fechas (SELECT report).
-- =============================================================
DROP PROCEDURE IF EXISTS sp_reporte_ventas_periodo$$
CREATE PROCEDURE sp_reporte_ventas_periodo(
    IN p_fecha_inicio DATE,
    IN p_fecha_fin    DATE
)
BEGIN
    SELECT
        v.id_venta,
        v.fecha,
        c.nombre  AS cliente,
        e.nombre  AS empleado,
        v.total
    FROM venta v
    JOIN cliente  c ON v.id_cliente  = c.id_cliente
    JOIN empleado e ON v.id_empleado = e.id_empleado
    WHERE DATE(v.fecha) BETWEEN p_fecha_inicio AND p_fecha_fin
    ORDER BY v.fecha DESC;
END$$

DELIMITER ;
