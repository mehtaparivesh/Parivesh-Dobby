const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UserContorller");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fs = require("fs");

router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);
// router.post('/getId',usersController.getId)
router.post("/logout", usersController.logout);
module.exports = router;
