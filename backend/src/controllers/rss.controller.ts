// bd = posts
import type{ Request, Response } from "express";
import { RSSService } from "../../services/rss.service";

export class RssController {
  // req solictud que el cliente envia al servidor
  // res respuesta que el servidor envia al cliente
  //obtener todo los rss
  static async getAll(req:Request,res:Response) {
    const rss = await RSSService.getAll();
    return res.json(rss);
  }
  // obtener por id rss
  static async getById(req:Request, res:Response) {
    const id = Number(req.params.id);
    const item = await RSSService.getById(id);
    if (!item) return res.status(404).json({ message: "Item no encontrado" });
    return res.json(item);
  }
  // crear nuevo item rss
  static async create(req:Request, res:Response) {
    const { title, content, image } = req.body;
    const id = await RSSService.create({ title, content, image });
    return res.status(201).json({ message: "item creado correctamente", id });
  }
  // actualizar rss
  static async update(req:Request, res:Response) {
    const id = Number(req.params.id);
    const update = await RSSService.update(id, req.body);
    if (!update) return res.status(404).json({ message: "RSS no encontrado" });
    return res.status(201).json({ message: "Rss Actualizado" })
  }

  // elminar rss
  static async delete(req:Request, res:Response) {
    const id = Number(req.params.id);
    const del = await RSSService.delete(id);
    if (!del) return res.status(404).json({ message: "Rss no encontrada" });
    return res.status(201).json({ message: "Rss eliminada correctamente" });
  }

}