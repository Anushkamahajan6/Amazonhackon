const express = require("express");

const router = express.Router();

const {
  getUserById,
  loginUser
} = require("../controllers/userController");

router.post("/login", loginUser);

router.get("/:userId", getUserById);

module.exports = router;