import type { Request, Response } from "express";
import { PostsService } from "../../services/posts.services";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await PostsService.getAll();
        res.json(posts);
    } catch (err) {
        console.error("Error al obtener posts:", err);
        res.status(500).json({ message: "Error al obtener posts" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const post = await PostsService.getById(id);
        if (!post) return res.status(404).json({ message: "Post no encontrado" });
        res.json(post);
    } catch (err) {
        console.error("Error al obtener post:", err);
        res.status(500).json({ message: "Error al obtener post" });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = { ...req.body, autor_id: req.body.autor_id || 1 }; // Default autor_id if not present
        const id = await PostsService.create(post);
        res.status(201).json({ message: "Post creado", id });
    } catch (err) {
        console.error("Error al crear post:", err);
        res.status(500).json({ message: "Error al crear post" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const success = await PostsService.updateById(id, req.body);
        if (!success) return res.status(404).json({ message: "Post no encontrado" });
        res.json({ message: "Post actualizado correctamente" });
    } catch (err) {
        console.error("Error al actualizar post:", err);
        res.status(500).json({ message: "Error al actualizar post" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const success = await PostsService.deleteById(id);
        if (!success) return res.status(404).json({ message: "Post no encontrado" });
        res.json({ message: "Post eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar post:", err);
        res.status(500).json({ message: "Error al eliminar post" });
    }
};
