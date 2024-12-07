const express = require("express");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const EmailHelper = require("../utils/emailHelper");
// const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    });
    // const newUser = new UserModel(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000); // 100000 - 999999
};

async function hashedPassword(password) {
  console.time("time taken");
  const salt = await bcrypt.genSalt(14);
  console.log("salt", salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashedPassword", hashedPassword);
  console.timeEnd("time taken");
  console.log("*****************");
  return hashedPassword;
}

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
    // if (req.body.password !== user.password) {
    //   return res.send({
    //     success: false,
    //     message: "Invalid password",
    //   });
    // }
    const password = "Ayush@123";
    hashedPassword(password);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
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

usersRouter.patch("/forgetpassword", async (req, res) => {
  try {
    /**
     * 1. you can ask for email
     * 2. check if user exists
     * 3. if email is not there then send error
     * 4. if email is there then generate otp
     * 5. save otp in db
     */
    if (req.body.email === undefined) {
      return res.send({
        success: false,
        message: " Please enter the email for forget password",
      });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (user === null) {
      return res.send({
        success: false,
        message: " User not found",
      });
    }
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    // sending email
    await EmailHelper("otp.html", user.email, {
      name: user.name,
      otp: otp,
    });
    res.status(200).send({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

usersRouter.patch("/resetpassword/:email", async (req, res) => {
  // -> otp
  // newPassword and confirmNewPassword
  // email - req.params.email

  try {
    let resetDetails = req.body;
    // required fields are present or not
    if (!resetDetails.password || !resetDetails.otp) {
      return res.send({
        success: false,
        message: "Please enter all the required fields",
      });
    }
    // search for user
    const user = await UserModel.findOne({ email: req.params.email }); // {name:"Aditya",otp:123456,role:"user"}
    // if user is not present
    if (user === null) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    // if otp is not matching or otp is expired
    if (user.otp !== resetDetails.otp || user.otpExpiry < Date.now()) {
      return res.send({
        success: false,
        message: "Invalid OTP or OTP expired",
      });
    }
    user.password = resetDetails.password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = usersRouter;
