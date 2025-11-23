// =====================
// IMPORTS
// =====================
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// CONEXIÓN MYSQL
// =====================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogdb", // <-- Cambia el nombre si usas otro
});

// =====================
// RUTAS DE POSTS
// =====================

// Obtener posts
app.get("/api/posts", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

// Crear post
app.post("/api/posts", async (req, res) => {
  const { title, content, image } = req.body;

  try {
    await db.query(
      "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)",
      [title, content, image ?? null]
    );
    res.json({ message: "Post creado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear post" });
  }
});

// Obtener post por ID
app.get("/api/posts/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener post" });
  }
});

// Eliminar post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.json({ message: "Post eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar post" });
  }
});

// =====================
// REGISTRO DE USUARIOS
// =====================
app.post("/api/registro", async (req, res) => {
  const { nombre, email, telefono, psw } = req.body;

  try {
    // Verificar si ya existe el email
    const [existe] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (existe.length > 0) {
      return res.status(400).json({ error: "Este email ya está registrado." });
    }

    // Insertar usuario
    await db.query(
      "INSERT INTO usuarios (nombre, email, telefono, psw) VALUES (?, ?, ?, ?)",
      [nombre, email, telefono, psw]
    );

    res.json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// =====================
// LOGIN DE USUARIO
// =====================
app.post("/api/login", async (req, res) => {
  const { email, psw } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND psw = ?",
      [email, psw]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    res.json({ message: "Login exitoso", usuario: rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// =====================
// PROXY RSS
// =====================
app.get("/api/rss", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
    });

    res.json({ contents: response.data });
  } catch (err) {
    res.status(500).json({ error: "RSS fetch failed" });
  }
});

// =====================
// PROXY HTML
// =====================
app.get("/api/html", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await axios.get(url);
    res.json({ html: response.data });
  } catch (err) {
    res.status(500).json({ error: "HTML fetch failed" });
  }
});

// =====================
// INICIAR SERVIDOR
// =====================
app.listen(3001, () =>
  console.log("Servidor backend corriendo en http://localhost:3001")
);
