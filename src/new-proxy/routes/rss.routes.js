const express = require("express");
const router = express.Router();
const rssController = require("../controllers/rss.controller");

router.get("/rss", rssController.getRSS);

module.exports = router;
