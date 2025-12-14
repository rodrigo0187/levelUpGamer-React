import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/posts.controller";
import verifyAdmin from "../middlewares/verifyAdmin";


const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes
router.post("/", verifyAdmin, createPost);
router.put("/:id", verifyAdmin, updatePost);
router.delete("/:id", verifyAdmin, deletePost);

export default router;
