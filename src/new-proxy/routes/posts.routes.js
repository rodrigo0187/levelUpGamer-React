const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const verifyToken = require("../middlewares/verifyToken");

// Rutas públicas
router.get("/posts", postsController.getPosts);
router.get("/posts/:id", postsController.getPostById);

// Crear post (requiere token)
router.post("/posts", verifyToken, postsController.createPost);

// Eliminar post (solo admin)
router.delete(
  "/posts/:id",
  verifyToken,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado: solo admin" });
    }
    next();
  },
  postsController.deletePost
);

module.exports = router;
