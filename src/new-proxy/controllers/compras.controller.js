// controllers/compras.controller.js
const db = require("../db.js");

exports.comprarProducto = async (req, res) => {
  const { idProducto } = req.body;
  const idUsuario = req.user.id;

  try {
    await db.query(
      "INSERT INTO compras (id_usuario, id_producto, fecha) VALUES (?, ?, NOW())",
      [idUsuario, idProducto]
    );
    res.json({ message: "Compra realizada con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al procesar la compra" });
  }
};
