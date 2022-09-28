const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { config } = require("./utils/config");
const { connectDb } = require("./utils/database.js");

const Api = require("./src/api");

app.use(bodyParser.json());
app.use(
  cors({
    origin: [/.[0-9]{4}/],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", Api);

connectDb(() => {
  app.listen(PORT, () => {
    console.log(`server running on port: ${config.PORT}`);
  });
});
