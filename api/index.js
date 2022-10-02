const express = require("express");
const router = express.Router();
const UserHandler = require("./UserHandler/router");
const ArticleHandler = require("./ArticleHandler/router");

router.use("/user", UserHandler);
router.use("/article", ArticleHandler);

module.exports = router;
