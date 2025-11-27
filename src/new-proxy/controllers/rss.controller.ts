import type {Request , Response} from "express";
import {RSSService} from "../../services/rss.service";

export class RssController {
  // req solictud que el cliente envia al servidor
  // res respuesta que el servidor envia al cliente
  static async getRSS(req:Request, res:Response){
      const rss = await RSSService.getAll();
      return res.json(rss);
  }
// obtener por id rss
  static async getByid(req:Request, res:Response){
    const id = Number(req.params.id);
    const item = await RSSService.getById(id);
    if (!item) return res.status(404).json({message:"Item no encontrado"});
    return res.json(item);
  }
// crear nuevo item rss
  static async createRSS(req:Request, res:Response){
    const {title,content,image} = req.body;
    const id = await RSSService.create({title,content,image});
    return res.status(201).json({id,message:"item creado correctamente"});
  }
  // actualizar rss
  static async updateRSS(req:Request, res: Response){
    const id = Number(req.params.id);
    const update = await RSSService.update(id,req.body);
    if(!update) return res.status(404).json({message:"RSS no encontrado"});
  }
  

}