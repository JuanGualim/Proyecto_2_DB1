import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";

export const login = async (username, password) => {
  // ORM: buscar usuario por username (operación CRUD #1 con Sequelize)
  const usuario = await Usuario.findOne({ where: { username, activo: true } });

  if (!usuario) {
    throw new Error("Usuario o contraseña incorrectos.");
  }

  const passwordOk = await bcrypt.compare(password, usuario.password_hash);
  if (!passwordOk) {
    throw new Error("Usuario o contraseña incorrectos.");
  }

  const token = jwt.sign(
    {
      id_usuario: usuario.id_usuario,
      username:   usuario.username,
      rol:        usuario.rol,
      nombre:     usuario.nombre,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    usuario: {
      id_usuario: usuario.id_usuario,
      username:   usuario.username,
      rol:        usuario.rol,
      nombre:     usuario.nombre,
    },
  };
};
