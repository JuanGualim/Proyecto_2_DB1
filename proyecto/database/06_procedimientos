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