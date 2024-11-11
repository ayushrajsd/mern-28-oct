const express = require("express");
const userRouter = express.Router();

const { createUser } = require("../controllers/userController");

userRouter.post("/", createUser); // /api/user/ - POST

module.exports = userRouter;
