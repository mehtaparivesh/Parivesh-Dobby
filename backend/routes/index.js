// importing modules
const express = require("express");
// initializing router
const router = express.Router();

// defining the main path
router.get("/", (req, res) => {
  return res.send("Welcome to MyTodo");
});
// redirecting to the coresponding path
router.use("/task", require("./image"));

// exporting as router
module.exports = router;
