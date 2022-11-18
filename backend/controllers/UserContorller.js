// importing env file
require("dotenv").config();
// importing modules
const jwt = require("jsonwebtoken");

// importing models
const User = require("../models/user");

// importing utility functions
const { hashPassword } = require("../utils");

// defining endpoints
module.exports.create = async (req, res) => {
  try {
    let user1 = await User.findOne({ email: req.body.email });
    if (user1) {
      return res.json({
        success: false,
        message: "Email already registered",
      });
    } else {
      let xedPassword = hashPassword(req.body.password);
      // creating new user
      let newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        verified: false,
      });

      if (newUser) {
        // if user created
        return res.json({
          success: true,
        });
      }
    }
  } catch (err) {
    // if error
    console.log(err);
    return res.json({
      success: false,
      message: "internal Server error",
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    // fetching user
    let user = await User.findOne({ email: req.body.email });
    let hashedPassword = hashPassword(req.body.password);

    if (!user || user.password != hashedPassword) {
      // edge cases check
      if (!user) console.log("User not found");
      if (user.password != hashedPassword) {
        console.log("Password don't match");
        return res.json({
          success: false,
          message: "Invalid Credentials",
        });
      }
    }
    // creating auth token
    const Token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    // setting cookie
    return res
      .cookie("user", Token, {
        maxAge: 9000000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "Login successful",
      });
  } catch (err) {
    // if err
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    console.log(req.user, " req.user in logout");

    if (req.user) req.user = null;
    // removing cookie from browser
    res.clearCookie("user").json({ success: true, message: "logout success" });
  } catch (err) {
    // if error
    console.log(err);
    return res.json({ success: false, message: "internal server error" });
  }
};
