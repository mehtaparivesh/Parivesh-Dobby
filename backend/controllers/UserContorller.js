const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const crypto = require("crypto");
module.exports.create = async (req, res) => {
  try {
    let user1 = await User.findOne({ email: req.body.email });

    if (user1) {
      return res.json({
        success: false,
        message: "Email already registered",
      });
    } else {
      let hashedPassword = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
      let newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        verified: false,
      });
      if (newUser) {
        return res.json({
          success: true,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "internal Server error",
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    let hashedPassword = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    if (!user || user.password != hashedPassword) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const Token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    console.log("token generated");
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
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    if (req.cookies.user) {
      res.clearCookie("user");
    }
    res.logout();
    return res.json({ success: true, message: "logout success" });
  } catch (err) {
    return res.json({ success: false, message: "internal server error" });
  }
};
