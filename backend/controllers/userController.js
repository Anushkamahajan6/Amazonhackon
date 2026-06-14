const User = require("../models/User");

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

const loginUser = async (req, res) => {

  try {

    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {

      user = await User.create({
        name,
        email
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

module.exports = {
  getUserById,
  loginUser
};