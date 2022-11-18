// importing modules
const express = require("express");
// initializing router
const router = express.Router();

// defining the main path
router.get("/", (req, res) => {
  return res.send("Welcome to MY canvas");
});
router.get("/check", (req, res) => {
  try {
    console.log(req.user);
    if (req.user) {
      return res.json({ success: true, isLoggedIn: true });
    } else {
      return res.json({ success: true, isLoggedIn: false });
    }
  } catch (err) {
    console.log(err);
  }
});
// redirecting to the coresponding path
router.use("/image", require("./image"));
router.use("/user", require("./user"));

// exporting as router
module.exports = router;
