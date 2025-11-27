import { Router } from "express";
import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from "../controllers/posts.controller.js";
import authMiddleware from "../middlewares/verifyToken.js";

const router = Router();
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Acceso denegado" });
  next();
};

// Public
router.get("/posts", listPosts);
router.get("/posts/:id", getPost);

// Admin
router.post("/posts", authMiddleware, adminOnly, createPost);
router.put("/posts/:id", authMiddleware, adminOnly, updatePost);
router.delete("/posts/:id", authMiddleware, adminOnly, deletePost);

export default router;
