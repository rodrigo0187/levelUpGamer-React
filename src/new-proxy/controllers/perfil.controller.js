// controllers/perfil.controller.js
const db = require("../db.js");

exports.getPerfil = async (req, res) => {
  try {
    const userId = req.user.id;

    const [userRows] = await db.query(
      "SELECT nombre, email, avatar FROM usuarios WHERE id = ?",
      [userId]
    );

    const [comprasRows] = await db.query(
      "SELECT * FROM compras WHERE id_usuario = ?",
      [userId]
    );

    res.json({
      usuario: userRows[0],
      compras: comprasRows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};
