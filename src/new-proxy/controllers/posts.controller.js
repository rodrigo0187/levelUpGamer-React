// src/new-proxy/controllers/posts.controller.js
import { db } from "../db.js";

// =====================
// OBTENER TODOS LOS POSTS
// =====================
export const getPosts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener posts:", err);
    res.status(500).json({ error: "Error al obtener posts" });
  }
};

// =====================
// CREAR UN POST
// =====================
export const createPost = async (req, res) => {
  const { title, content, image } = req.body;
  try {
    await db.query(
      "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)",
      [title, content, image ?? null]
    );
    res.json({ message: "Post creado exitosamente" });
  } catch (err) {
    console.error("Error al crear post:", err);
    res.status(500).json({ error: "Error al crear post" });
  }
};

// =====================
// OBTENER POST POR ID
// =====================
export const getPostById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
    res.json(rows[0] || null);
  } catch (err) {
    console.error("Error al obtener post:", err);
    res.status(500).json({ error: "Error al obtener post" });
  }
};

// =====================
// ELIMINAR POST
// =====================
export const deletePost = async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.json({ message: "Post eliminado" });
  } catch (err) {
    console.error("Error al eliminar post:", err);
    res.status(500).json({ error: "Error al eliminar post" });
  }
};
