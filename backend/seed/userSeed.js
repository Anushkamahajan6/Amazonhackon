const dotenv = require("dotenv");

const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

connectDB();

const importUser = async () => {
  try {

    await User.deleteMany();

    const user = await User.create({
      name: "Kinjal Gupta",
      email: "kinjal@gmail.com",
      greenCredits: 100
    });

    console.log(user);

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

importUser();