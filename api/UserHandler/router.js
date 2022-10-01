const express = require("express");
const router = express.Router();
const { getUser, addUser } = require("./controller");

router.get("/:userId", getUser);
router.post("/", addUser);

module.exports = router;
