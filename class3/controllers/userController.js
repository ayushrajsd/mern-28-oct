const UserModel = require("../models/userModel");

const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    console.log("creating user");
    const user = await UserModel.create({
      name: name,
      email: email,
    });
    return res.status(201).json({ message: "User created", user: user });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong", err });
  }
};

module.exports = { createUser };
