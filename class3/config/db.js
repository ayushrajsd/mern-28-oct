const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://ayushrajsd:X19RgdyckQt9EeRa@cluster0.fke58.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB");
  }
};

module.exports = connectDB;
