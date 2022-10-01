const express = require("express");
const router = express.Router();
const { getUser, addUser } = require("./controller");

router.get("/:articleId", getUser);
router.post("/", addUser);

module.exports = router;
