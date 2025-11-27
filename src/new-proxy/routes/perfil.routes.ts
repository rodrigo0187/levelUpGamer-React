import express from "express";
import { getMyProfile, updateMyProfile } from "../controllers/perfil.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/perfil", verifyToken, getMyProfile);
router.put("/perfil", verifyToken, updateMyProfile);

export default router;
