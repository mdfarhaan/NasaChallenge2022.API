const AWS = require("aws-sdk");
const { config } = require("./config");

exports.S3 = new AWS.S3({
  accessKeyId: config.S3AccessKey,
  secretAccessKey: config.S3SecretAccessKey,
});
