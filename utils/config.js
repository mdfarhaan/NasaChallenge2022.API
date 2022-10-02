require("dotenv").config();

exports.config = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 8000,
  S3AccessKey: process.env.S3AccessKey,
  S3SecretAccessKey: process.env.S3SecretAccessKey,
  S3Bucket: process.env.S3Bucket,
};
