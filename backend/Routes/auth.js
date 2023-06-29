const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser.js");
const JWT_SECRET = "blogac";

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    if (!name || !email || !password || !confirm_password) {
      return res.json({
        status: "Failed",
        message: "All fields are required",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        status: "Failed",
        message: "Email already registered",
      });
    }
    if (password !== confirm_password) {
      return res.json({
        status: "Failed",
        message: "Password and Confirm Password must be the same",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const authToken = jwt.sign({ savedUser }, JWT_SECRET);
    return res.status(200).json({
      status: "Success",
      message: "User registered successfully",
      user: savedUser,
      authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: "Server error",
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({
        status: "Failed",
        message: "All fields are required",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "Failed",
        message:
          "Incorrect Email or Password, Please Try To Login With Correct Credentials",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "Failed",
        message:
          "Incorrect Email or Password, Please Try To Login With Correct Credentials",
      });
    }
    const data = {
      user,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({
      status: "Success",
      message: "User registered successfully",
      user: user,
      authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: "Server error",
    });
  }
});

module.exports = router;
