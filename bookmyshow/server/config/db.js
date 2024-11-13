const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;
console.log(dbURL);

const connectDB = async () => {
  try {
    // console.log("process", process);
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
