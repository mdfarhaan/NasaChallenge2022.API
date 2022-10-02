const express = require("express");
const router = express.Router();
const { addArticle, getArticle, getAllArticle } = require("./controller");

router.get("/filter/:articleId", getArticle);
router.get("/all", getAllArticle);
router.post("/", addArticle);

module.exports = router;
