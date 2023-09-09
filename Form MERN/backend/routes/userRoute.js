const express = require("express");
const router = express.Router();
const {
  registerUser,
} = require("../controllers/userController");
const {
  zipChecker,
} = require("../controllers/zipController");

router.post("/register", registerUser);
router.post("/zipChecker", zipChecker);

module.exports = router;
