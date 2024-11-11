const mongoose = require("mongoose");

// define a schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
});

userSchema.pre("save", function (next) {
  console.log("Before saving the user");
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

userSchema.post("save", function (doc, next) {
  console.log(`${doc.name} has been saved`);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
