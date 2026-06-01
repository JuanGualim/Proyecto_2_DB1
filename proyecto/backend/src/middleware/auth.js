import jwt from "jsonwebtoken";

// ── Verifica el token JWT en el header Authorization ─────────
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token requerido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // { id_usuario, username, rol, nombre }
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};

// ── Verifica que el usuario tenga uno de los roles permitidos ─
export const requiereRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ error: "No autenticado." });
    }
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        error: `Acceso denegado. Rol requerido: ${rolesPermitidos.join(" o ")}.`,
      });
    }
    next();
  };
};
