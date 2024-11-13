const express = require("express");
const UserModel = require("../models/userModel");

const usersRouter = express.Router();

// register an user

usersRouter.post("/register", async (req, res) => {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.send({
      succes: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// login an user
usersRouter.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    if (req.body.password !== user.password) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }
    res.sendFile({
      success: true,
      message: "User logged in successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = usersRouter;
