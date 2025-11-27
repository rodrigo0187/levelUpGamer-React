import { Router } from "express";
import { RssController } from "../controllers/rss.controller";

const router = Router();

router.get("/rss", RssController.getAll);
router.get("/rss/:id", RssController.getById);
router.post("/rss", RssController.create);
router.put("/rss/:id", RssController.update);
router.delete("/rss/:id", RssController.delete);

export default router;
