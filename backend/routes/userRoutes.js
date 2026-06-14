const express = require("express");

const router = express.Router();

const {
  getUserById,
  signupUser,
  loginUser
} = require("../controllers/userController");

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/:userId", getUserById);

module.exports = router;