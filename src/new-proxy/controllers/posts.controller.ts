import * as postsService from "../services/posts.service.js";

export const listPosts = async (req, res) => {
  try {
    const rows = await postsService.getAllPosts();
    res.json(rows);
  } catch (err) {
    console.error("Error listPosts:", err);
    res.status(500).json({ message: "Error al obtener posts" });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.json(post);
  } catch (err) {
    console.error("Error getPost:", err);
    res.status(500).json({ message: "Error al obtener post" });
  }
};

export const createPost = async (req, res) => {
  try {
    const id = await postsService.createPost(req.body);
    res.status(201).json({ message: "Post creado", id });
  } catch (err) {
    console.error("Error createPost:", err);
    res.status(500).json({ message: "Error al crear post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const affected = await postsService.updatePost(req.params.id, req.body);
    if (affected === 0) return res.status(404).json({ message: "Post no encontrado" });
    res.json({ message: "Post actualizado" });
  } catch (err) {
    console.error("Error updatePost:", err);
    res.status(500).json({ message: "Error al actualizar post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const affected = await postsService.deletePost(req.params.id);
    if (affected === 0) return res.status(404).json({ message: "Post no encontrado" });
    res.json({ message: "Post eliminado" });
  } catch (err) {
    console.error("Error deletePost:", err);
    res.status(500).json({ message: "Error al eliminar post" });
  }
};
