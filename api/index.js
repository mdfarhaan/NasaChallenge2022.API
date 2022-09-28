const express = require("express");
const router = express.Router();

router.use("/user", LikeHandler);

module.exports = router;
