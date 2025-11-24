const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken"); // middleware JWT
const db = require("../db.js");

// Endpoint para registrar compras
router.post("/comprar", verifyToken, async (req, res) => {
  const { items } = req.body; // items = [{ code, qty }]
  const userId = req.user.id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Carrito vacío" });
  }

  try {
    for (const item of items) {
      await db.query(
        "INSERT INTO compras (user_id, product_code, cantidad) VALUES (?, ?, ?)",
        [userId, item.code, item.qty]
      );
    }

    res.json({ message: "Compra realizada con éxito" });
  } catch (err) {
    console.error("Error en /comprar:", err);
    res.status(500).json({ message: "Error al procesar la compra" });
  }
});

module.exports = router;
