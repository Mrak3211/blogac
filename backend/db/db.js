const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/blogac";

const connectToMongo = async () => {
  try {
    mongoose.connect(mongoURL);
    console.log("Connected To Database Successfully...");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectToMongo;
