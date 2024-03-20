import express from "express";

const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserDetails,
  getLoggedOut
} = require("../Controllers/authController");

const {isAutheticatedUser} = require("../middleware/isAuthenticated");

router.route("/auth/login").post(loginUser);
router.route("/auth/register").post(registerUser);
router.route("/auth/me").get(isAutheticatedUser, getUserDetails);
router.route("/auth/logout").get(isAutheticatedUser, getLoggedOut);

module.exports = router;
