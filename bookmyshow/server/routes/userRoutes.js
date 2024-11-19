const express = require("express");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
// const cookieParser = require("cookie-parser");

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
    // console.log("req received", req.body, user);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,});

    // console.log(token);
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

usersRouter.get("/get-current-user", authMiddleware, async (req, res) => {
  const user = await UserModel.findById(req.body.userId).select("-password");
  res.send({
    success: true,
    messagae: "YOu are authorized to go the protected route",
    data: user,
  });
});

module.exports = usersRouter;
