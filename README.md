# 📦 Proyecto 2 - Sistema de Gestión de Tienda

## 🧾 Descripción

Este proyecto consiste en el diseño e implementación de una aplicación web completa para la gestión de inventario y ventas de una tienda. Incluye:

- Base de datos relacional (MySQL)
- Backend (Node.js + Express)
- Frontend (React + Vite + Tailwind)
- Infraestructura completa con Docker

La aplicación permite gestionar productos, clientes y ventas, además de visualizar reportes avanzados utilizando consultas SQL complejas.

---

# 🏗️ Arquitectura del Proyecto

```
proyecto/
├── backend/        # API REST (Node.js + Express)
├── frontend/       # Interfaz web (React + Vite)
├── database/       # Scripts SQL
├── docker-compose.yml
└── README.md
```

---

# 🧠 Base de Datos

Se diseñó una base de datos relacional completamente normalizada (3FN) con las siguientes entidades:

- Producto
- Categoría
- Proveedor
- Cliente
- Empleado
- Venta
- Detalle de venta

Incluye:

- Relaciones con claves foráneas
- Índices para optimización
- Datos de prueba realistas (mínimo 25 registros por tabla)

---

# 🗄️ Scripts SQL

Ubicados en `database/`:

```
01_schema.sql     # Creación de tablas
02_data.sql       # Inserción de datos
03_indexes.sql    # Índices
views.sql         # Vistas
queries.sql       # (documentación)
transactions.sql  # (documentación)
```

## ⚠️ Nota importante

- `queries.sql` y `transactions.sql` **NO son necesarios para ejecutar el sistema**
- Se incluyen únicamente como **documentación de las consultas SQL**
- Todas las consultas están implementadas en el backend y expuestas mediante endpoints

---

# 🔍 Consultas SQL implementadas

## ✔ JOIN
- Ventas con cliente y empleado
- Productos con categoría y proveedor
- Detalle de ventas

## ✔ Subqueries
- Productos vendidos
- Clientes con compras superiores al promedio

## ✔ GROUP BY + HAVING
- Reporte de clientes
- Reporte de productos
- Productos populares

## ✔ CTE
- Clientes elite

## ✔ VIEW
- `vista_reporte_ventas`

## ✔ Transacción
- Registro completo de venta (venta + detalle + actualización de stock)

---

# ⚙️ Backend

Tecnologías:

- Node.js
- Express
- MySQL
- dotenv

Características:

- API REST
- Consultas SQL explícitas (sin ORM)
- Manejo de errores
- Transacciones
- Arquitectura por capas (routes, controllers, services)

---

# 🎨 Frontend

Tecnologías:

- React
- Vite
- Tailwind CSS

Características:

- CRUD completo de productos y clientes
- Navegación con React Router
- Dashboard de reportes
- UI moderna y responsiva

---

# 📊 Funcionalidades

## ✔ CRUD
- Productos
- Clientes

## ✔ Reportes
- Ventas
- Clientes top
- Productos populares
- Clientes elite (CTE)
- Productos vendidos
- Reportes agregados

## ✔ Transacción
- Botón para crear venta desde la UI

---

# 🐳 Docker

## Requisitos
- Docker
- Docker Compose

## Ejecutar el proyecto

```
docker compose up --build
```

---

## 🌐 Acceso

Frontend:
http://localhost:5173

Backend:
http://localhost:3000

---

# 📊 Cumplimiento de Rúbrica

## 🟩 I. Diseño de Base de Datos 
✔ Diagrama ER  
✔ Modelo relacional  
✔ Normalización 3FN  
✔ DDL completo  
✔ Datos de prueba  
✔ Índices  

---

## 🟩 II. SQL 
✔ JOIN (3 consultas)  
✔ Subqueries (2 consultas)  
✔ GROUP BY + HAVING  
✔ CTE  
✔ VIEW  
✔ Transacción  

---

## 🟩 III. Aplicación Web (35 pts)
✔ CRUD completo (2 entidades)  
✔ Reportes en UI  
✔ Manejo de errores  
✔ README completo  

