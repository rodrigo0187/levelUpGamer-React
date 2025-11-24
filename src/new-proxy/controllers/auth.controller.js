// controllers/authcontroller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db.js");

// =====================
// REGISTRO
// =====================
exports.register = async (req, res) => {
  const { nombre, email, telefono, psw } = req.body;

  if (!nombre || !email || !psw) {
    return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
  }

  try {
    const [existe] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(psw, 10);

    await db.query(
      "INSERT INTO usuarios (nombre, email, telefono, psw, role) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, telefono ?? null, hash, "user"]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente" });

  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// =====================
// LOGIN
// =====================
exports.login = async (req, res) => {
  const { email, psw } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(psw, user.psw);

    if (!match) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      "secretkey",
      { expiresIn: "1h" }
    );

    // <-- IMPORTANTE: esto es lo que tu frontend espera
    res.json({
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error en login" });
  }
};
