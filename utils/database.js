const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { config } = require("./config");

let _db;

const connectDb = (callback) => {
  MongoClient.connect(config.DB_URI)
    .then((client) => {
      console.log("Database Connected");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getdb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.connectDb = connectDb;
exports.getdb = getdb;
