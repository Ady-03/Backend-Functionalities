// responsible for conection between NodeJs and MongoDB
require("dotenv").config();
const mongoose = require("mongoose");
// this is local database URL
const mongoURL = "mongodb://127.0.0.1:27017/myDatabase";
//const mongoURL = process.env.DB_URL; // this is the URL for MongoDB Atlas, stored in .env file for security reasons
mongoose.connect(mongoURL);
console.log(mongoURL);
const db = mongoose.connection; //mongoose maintains a default connection
// object representing the mongodb connection
// now define event listeners for daabase connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

// export the database connection

module.exports = db;
