const express = require("express");

const router = express.Router();

const {
  createReturn,
  getReturnStatus
} = require("../controllers/returnController");

router.post("/", createReturn);

router.get("/:id/status", getReturnStatus);

module.exports = router;