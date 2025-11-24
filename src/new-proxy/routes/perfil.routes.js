// routes/perfil.routes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const perfilController = require("../controllers/perfil.controller");

router.get("/", verifyToken, perfilController.getPerfil);

module.exports = router;
