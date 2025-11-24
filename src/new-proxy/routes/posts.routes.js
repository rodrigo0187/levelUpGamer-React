// routes/posts.routes.js
import express from "express";
import { getPosts, createPost, getPostById, deletePost } from "../controllers/posts.controller.js";
import verifyToken from "../middlewares/verifyToken.js"; // Asegúrate que tu middleware también use export default o export nombrado

const router = express.Router();

// Rutas públicas
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);

// Crear post (requiere token)
router.post("/posts", verifyToken, createPost);

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
  deletePost
);

export default router;
