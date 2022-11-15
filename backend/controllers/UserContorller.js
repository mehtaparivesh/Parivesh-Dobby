const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();
module.exports.create = async (req, res) => {
  try {
    // const bytes = CryptoJs.AES.decrypt(req.body.password, "Pm4625589@");
    let user1 = await User.findOne({ email: req.body.email });
    let user2 = await TempUser.findOne({ email: req.body.email });
    if (user2) {
      await TempUser.deleteOne({ email: req.body.email });
    }
    if (user1) {
      return res.status(236).json({
        success: false,
        message: "Email already registered",
      });
    } else {
      let newUser = await TempUser.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        verified: false,
      });
      if (newUser) {
        const verificationToken = jwt.sign(
          {
            userId: newUser._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "10d",
          }
        );
        const url = `http://localhost:3000/verify/${verificationToken}`;
        const sent = sendEmail({
          email: newUser.email,
          name: newUser.name,
          subject: "Verify your account",
          content: url,
        });
        if (sent) {
          res.cookie("user", verificationToken);
          return res.json({
            success: true,
          });
        }
        return res.json({
          message: "internal server error",
          success: false,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json(404, {
      token: verificationToken,
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(256).json({
        message: "No account exists with this email",
      });
    }
    // console.log(req.body);
    const bytes = CryptoJs.AES.decrypt(req.body.password, "Pm4625589@");
    const pass1 = bytes.toString(CryptoJs.enc.Utf8);
    const bytes2 = CryptoJs.AES.decrypt(user.password, "Pm4625589@");
    const pass2 = bytes2.toString(CryptoJs.enc.Utf8);
    console.log(pass1, pass2);
    if (pass1.toString() !== pass2.toString()) {
      return res.status(256).json({ message: "Invalid credentials" });
    }

    const Token = jwt.sign(
      { email: user.email, name: user.name, _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );
    console.log("token generated");
    res.cookie("user", Token);
    return res.json({
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
    let user = await User.findOne({ token: req.body.token.toString() });
    if (user) {
      user.save();
      return res.json({
        success: true,
        message: "successfully logged out",
      });
    } else {
      return res.json({
        success: false,
        message: "internal server error",
      });
      // console.log("not logged out");
    }
  } catch (err) {
    // console.log(err, "not logged out");
    return res.json({
      message: "internal server error",
    });
  }
};

module.exports.upload = (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "internal server error" });
  }
};
