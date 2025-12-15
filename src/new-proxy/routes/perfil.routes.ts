<<<<<<< HEAD
import express from "express";
import { getMyProfile, updateMyProfile } from "../controllers/perfil.controller";
import verifyToken from "../middlewares/verifyToken";
=======
import {Router} from "express";
import { getMyProfile, updateMyProfile } from "../controllers/perfil.controller";
import verifyToken from "../middlewares/verifyToken.js";
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98

const router = Router();

router.get("/perfil", verifyToken, getMyProfile);
router.put("/perfil", verifyToken, updateMyProfile);

export default router;
