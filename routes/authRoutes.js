const express = require("express");
const router = express.Router();
const { signup, verifyOTP ,login} = require("../controllers/authController");

router.post("/signup", signup);        // Signup with password
router.post("/verify-otp", verifyOTP); // Then verify OTP
router.post("/login",login);
module.exports = router;
