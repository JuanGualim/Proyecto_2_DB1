import { login } from "../services/authService.js";

export const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "username y password requeridos." });
    }
    const resultado = await login(username, password);
    res.json(resultado);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const meHandler = (req, res) => {
  res.json({ usuario: req.usuario });
};
