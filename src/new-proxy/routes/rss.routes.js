// routes/rss.routes.js
import express from "express";
import { getRSS } from "../controllers/rss.controller.js";

const router = express.Router();

router.get("/rss", getRSS);

export default router;
