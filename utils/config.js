require("dotenv").config();

exports.config = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 8000,
};
