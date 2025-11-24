// controllers/compras.controller.js
import { db } from "../db.js";

export const comprarProducto = async (req, res) => {
  const { idProducto } = req.body;
  const idUsuario = req.user.id;

  try {
    await db.query(
      "INSERT INTO compras (id_usuario, id_producto, fecha) VALUES (?, ?, NOW())",
      [idUsuario, idProducto]
    );
    res.json({ message: "Compra realizada con éxito" });
  } catch (err) {
    console.error("Error en comprarProducto:", err);
    res.status(500).json({ message: "Error al procesar la compra" });
  }
};
