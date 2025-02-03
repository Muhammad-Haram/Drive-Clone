const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../model/user.model.js");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 5 characters long"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res.status(400).json({
        message: "username or pasasword is incorrect",
      });
    }

    const isMatched = await bcypt.compare(password, user.password);

    if (!isMatched) {
      res.status(400).json({
        message: "username or pasasword is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.send("Logged in successfully");
  }
);

module.exports = router;
