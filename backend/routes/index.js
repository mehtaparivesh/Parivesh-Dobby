// importing modules
const express = require("express");
const { check } = require("../controllers/checkController");
// initializing router
const router = express.Router();

// defining the main path
router.get("/", (req, res) => {
  return res.send("Welcome to MY canvas");
});
router.get("/check", check);
// redirecting to the coresponding path
router.use("/image", require("./image"));
router.use("/user", require("./user"));

// exporting as router
module.exports = router;
