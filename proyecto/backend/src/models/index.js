import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// ── Modelo: Usuario ──────────────────────────────────────────
export const Usuario = sequelize.define(
  "usuario",
  {
    id_usuario:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username:      { type: DataTypes.STRING(50),  allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    rol: {
      type: DataTypes.ENUM("admin", "gerente", "vendedor", "cajero", "bodeguero"),
      allowNull: false,
    },
    nombre:  { type: DataTypes.STRING(100), allowNull: false },
    activo:  { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "usuario", timestamps: false }
);

// ── Modelo: Producto ─────────────────────────────────────────
export const Producto = sequelize.define(
  "producto",
  {
    id_producto:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:        { type: DataTypes.STRING(100), allowNull: false },
    precio:        { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock:         { type: DataTypes.INTEGER, allowNull: false },
    id_categoria:  { type: DataTypes.INTEGER, allowNull: false },
    id_proveedor:  { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "producto", timestamps: false }
);

// ── Modelo: Cliente ──────────────────────────────────────────
export const Cliente = sequelize.define(
  "cliente",
  {
    id_cliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:     { type: DataTypes.STRING(100), allowNull: false },
    email:      { type: DataTypes.STRING(100) },
    telefono:   { type: DataTypes.STRING(20) },
  },
  { tableName: "cliente", timestamps: false }
);

// ── Modelo: Empleado ─────────────────────────────────────────
export const Empleado = sequelize.define(
  "empleado",
  {
    id_empleado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre:      { type: DataTypes.STRING(100), allowNull: false },
    puesto:      { type: DataTypes.STRING(50),  allowNull: false },
  },
  { tableName: "empleado", timestamps: false }
);
