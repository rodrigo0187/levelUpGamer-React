const db = require("../db");

exports.getPosts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Error al obtener posts" });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, image } = req.body;
  try {
    await db.query("INSERT INTO posts (title, content, image) VALUES (?, ?, ?)", [
      title,
      content,
      image ?? null,
    ]);
    res.json({ message: "Post creado exitosamente" });
  } catch {
    res.status(500).json({ error: "Error al crear post" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
    res.json(rows[0] || null);
  } catch {
    res.status(500).json({ error: "Error al obtener post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.json({ message: "Post eliminado" });
  } catch {
    res.status(500).json({ error: "Error al eliminar post" });
  }
};
