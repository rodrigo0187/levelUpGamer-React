import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../controllers/perfil.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.get("/perfil", verifyToken, getMyProfile);
router.put("/perfil", verifyToken, updateMyProfile);

export default router;
