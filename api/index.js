const express = require("express");
const router = express.Router();
const UserHandler = require("./UserHandler/router");

router.use("/user", UserHandler);

module.exports = router;
