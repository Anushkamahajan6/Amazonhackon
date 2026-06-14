const express = require("express");
const upload = require("../config/multer");

const router = express.Router();

const {
  createReturn,
  getAllReturns,
  getReturnStatus
} = require("../controllers/returnController");
router.post(
  "/",
  upload.single("image"),
  createReturn
);

router.get("/", getAllReturns);
router.get("/:id/status", getReturnStatus);

module.exports = router;