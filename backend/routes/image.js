// importing modules
const express = require("express");
const { upload } = require("../config/multer");
// initializing router
const router = express.Router();
// importing controller
const controller = require("../controllers/imageController");

// redirecting requests to the coresponding controller
router.post("/upload", upload.single("file"), controller.upload);
router.get("/list", controller.getImagesList);

// exporting as router
module.exports = router;
