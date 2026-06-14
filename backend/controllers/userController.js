const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {

  try {

    const user = await User.findById(req.params.userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.json(user);

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const signupUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      {
        userId: user._id
      },
      "secretkey"
    );

    res.status(201).json({
      token,
      user
    });

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      "secretkey"
    );

    res.json({
      token,
      user
    });

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getUserById,
  signupUser,
  loginUser
};