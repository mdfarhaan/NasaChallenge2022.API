const express = require("express");
const router = express.Router();
const { addArticle, getArticle } = require("./controller");

router.get("/:articleId", getArticle);
router.post("/", addArticle);

module.exports = router;
