const express = require("express");
const passport = require("passport");
const router = express.Router();
const usersController = require("../controllers/usersController");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const fs = require("fs");

router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);
// router.post('/getId',usersController.getId)
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  usersController.logout
);
module.exports = router;
