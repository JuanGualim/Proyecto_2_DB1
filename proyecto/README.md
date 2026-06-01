# 📦 Proyecto 3 - Sistema de Gestión de Tienda

## 🧾 Descripción

Este proyecto extiende la aplicación web del Proyecto 2 —gestión de inventario y ventas de una tienda— incorporando seguridad a nivel de base de datos mediante un esquema de roles y permisos, stored procedures con manejo de transacciones y excepciones, y el uso obligatorio de un ORM (Sequelize).

Incluye:

- Base de datos relacional (MySQL) con roles, permisos granulares y stored procedures
- Backend (Node.js + Express + Sequelize)
- Frontend (React + Vite + Tailwind) con rutas y vistas protegidas por rol
- Infraestructura completa con Docker

---

# 🏗️ Arquitectura del Proyecto

```
proyecto/
├── backend/
│   └── src/
│       ├── config/         # Configuración de Sequelize y pool MySQL
│       ├── controllers/    # Lógica de cada endpoint
│       ├── middlewares/    # Verificación JWT y roles
│       ├── models/         # Modelos Sequelize (ORM)
│       ├── routes/         # Definición de rutas protegidas
│       ├── services/       # Lógica de negocio, llamadas a SPs y ORM
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/     # Navbar, ProtectedRoute, FormProducto
│       ├── context/        # AuthContext (sesión JWT)
│       ├── pages/          # Login, Inicio, Productos, Clientes, Ventas, Reportes
│       └── services/       # api.js (llamadas al backend)
├── database/
│   ├── 01_shcema.sql       # DDL: creación de tablas
│   ├── 02_data.sql         # Datos de prueba (25+ registros por tabla)
│   ├── 03_indexes.sql      # Índices de optimización
│   ├── 04_views.sql        # Vista vista_reporte_ventas
│   ├── 05_roles.sql        # CREATE ROLE, GRANT, REVOKE
│   └── 06_procedures.sh    # Stored procedures (ejecutado como script bash)
├── docker-compose.yml
└── README.md
```

---

# 🧠 Base de Datos

Base de datos relacional normalizada (3FN) con las siguientes entidades:

- Categoría
- Proveedor
- Producto
- Cliente
- Empleado
- Venta
- Detalle de venta
- Usuario (nueva en Proyecto 3)

Incluye relaciones con claves foráneas, índices para optimización y datos de prueba con mínimo 25 registros por tabla.

---

# 🔐 Seguridad y Roles

Se definen exactamente 5 roles en el DBMS mediante `CREATE ROLE` con permisos granulares asignados con `GRANT` y `REVOKE`.

## Esquema de roles

| Rol | Tablas accesibles | Operaciones permitidas |
|---|---|---|
| `rol_admin` | Todas | ALL PRIVILEGES |
| `rol_gerente` | categoria, proveedor, cliente, empleado, producto, venta, detalle_venta | SELECT, INSERT, UPDATE |
| `rol_vendedor` | producto, cliente, categoria, proveedor, empleado, venta, detalle_venta | SELECT en catálogos, INSERT en ventas y clientes |
| `rol_cajero` | producto, cliente, empleado, venta, detalle_venta | SELECT, INSERT en ventas |
| `rol_bodeguero` | producto, categoria, proveedor | SELECT, UPDATE(stock) en producto |

El usuario de conexión `proy3` tiene asignado `rol_admin` como rol por defecto.

## Autenticación

La autenticación se implementa con JWT. Al hacer login, el backend valida las credenciales contra la tabla `usuario` usando bcrypt, y devuelve un token con el rol del usuario. Todas las rutas del backend están protegidas con middleware que verifica el token y el rol.

## Usuarios de prueba

| Username | Contraseña | Rol |
|---|---|---|
| admin | admin123 | admin |
| gerente | gerente123 | gerente |
| vendedor | vendedor123 | vendedor |
| cajero | cajero123 | cajero |
| bodeguero | bodeguero123 | bodeguero |

## Acceso por rol en la UI

| Sección | admin | gerente | vendedor | cajero | bodeguero |
|---|---|---|---|---|---|
| Productos (ver) | ✔ | ✔ | ✔ | ✔ | ✔ |
| Productos (crear/editar) | ✔ | ✔ | ✗ | ✗ | ✗ |
| Productos (eliminar) | ✔ | ✗ | ✗ | ✗ | ✗ |
| Productos (actualizar stock) | ✗ | ✗ | ✗ | ✗ | ✔ |
| Clientes | ✔ | ✔ | ✔ | ✔ | ✗ |
| Ventas | ✔ | ✔ | ✔ | ✔ | ✗ |
| Reportes | ✔ | ✔ | ✗ | ✗ | ✗ |

---

# 🗄️ Scripts SQL

Ubicados en `database/`, se montan automáticamente en el contenedor de MySQL al levantar el proyecto:

```
01_shcema.sql      # Creación de tablas (incluyendo tabla usuario)
02_data.sql        # Inserción de datos de prueba + usuarios hasheados
03_indexes.sql     # Índices de optimización
04_views.sql       # Vista vista_reporte_ventas
05_roles.sql       # 5 roles con permisos granulares + asignación a proy3
06_procedures.sh   # 6 stored procedures con transacciones y excepciones
```

### Archivos de documentación (no necesarios para ejecutar)

```
queries.sql        # Documentación de consultas SQL
transaction.sql    # Documentación de transacciones
```

---

# ⚙️ Stored Procedures

Se implementan 6 stored procedures invocados desde el backend, todos con manejo de excepciones mediante `DECLARE EXIT HANDLER FOR SQLEXCEPTION`.

| SP | Descripción | Parámetros OUT | Transacción con ROLLBACK |
|---|---|---|---|
| `sp_crear_venta` | Crea venta completa, valida stock | `p_id_venta`, `p_error_msg` | ✔ |
| `sp_actualizar_stock` | Incrementa stock de un producto | `p_resultado` | ✔ |
| `sp_crear_producto` | Inserta producto validando categoría y proveedor | `p_id_nuevo`, `p_resultado` | ✔ |
| `sp_eliminar_producto` | Elimina producto solo si no tiene ventas | `p_resultado` | ✔ |
| `sp_crear_cliente` | Inserta cliente validando email único | `p_id_nuevo`, `p_resultado` | ✔ |
| `sp_reporte_ventas_periodo` | Reporte de ventas entre dos fechas | — | — |

---

# 🔄 ORM (Sequelize)

Sequelize está configurado en `backend/src/config/db.js` y se usa en al menos 3 operaciones CRUD:

- `Usuario.findOne` — autenticación en login
- `Producto.findAll` / `Producto.findByPk` / `Producto.update` — gestión de productos
- `Cliente.findAll` / `Cliente.findByPk` / `Cliente.update` / `Cliente.destroy` — gestión de clientes
- `Empleado.findAll` — consultas de empleados

Las operaciones críticas (crear, eliminar) se delegan a stored procedures invocados desde el pool de `mysql2`.

---

# 🔍 Consultas SQL implementadas

## JOIN
- Ventas con cliente y empleado
- Productos con categoría y proveedor
- Detalle de ventas con productos y clientes

## Subqueries
- Productos que han tenido al menos una venta
- Clientes con compras superiores al promedio

## GROUP BY + HAVING
- Reporte de clientes (total compras y gasto)
- Reporte de productos (unidades vendidas e ingresos)
- Productos populares (más de 5 unidades vendidas)

## CTE
- Clientes elite (gasto superior al promedio)

## VIEW
- `vista_reporte_ventas` — join completo de ventas con cliente, empleado, producto y subtotal

---

# ⚙️ Backend

Tecnologías:

- Node.js + Express
- Sequelize (ORM)
- mysql2 (pool para stored procedures)
- jsonwebtoken (JWT)
- bcrypt (hash de contraseñas)
- dotenv

Arquitectura por capas: routes → controllers → services → (ORM o SP)

---

# 🎨 Frontend

Tecnologías:

- React 19
- Vite
- Tailwind CSS
- React Router v7

Características:

- Login con JWT y persistencia de sesión en localStorage
- Rutas protegidas por rol con `ProtectedRoute`
- CRUD completo de productos y clientes (según rol)
- Registro de ventas con validación de stock
- Dashboard de reportes (solo admin y gerente)
- Página de acceso denegado para rutas no permitidas
- Botón de actualización de stock exclusivo para bodeguero

---

# 🐳 Docker

## Requisitos

- Docker
- Docker Compose

## Ejecutar el proyecto

```bash
docker compose up --build
```

Este único comando levanta los tres servicios desde cero:

- `tienda_db` — MySQL 8.0 con todos los scripts ejecutados automáticamente en orden
- `tienda_backend` — API REST en Node.js
- `tienda_frontend` — Interfaz React servida por nginx

No se requiere ningún paso adicional. La base de datos se inicializa con tablas, datos de prueba, índices, vista, roles y stored procedures automáticamente.

## Variables de entorno

Las credenciales están definidas en `docker-compose.yml`. Para un entorno personalizado, copiá `.env.example` a `.env` y ajustá los valores. Las credenciales fijas para calificación son:

- Usuario DB: `proy3`
- Contraseña DB: `secret`

---

## 🌐 Acceso

| Servicio | URL |
|---|---|
| Frontend | http://localhost:3001 |
| Backend | http://localhost:3000 |

