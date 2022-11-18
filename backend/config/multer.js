// server.js....
// Sets up where to store POST images
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
});
module.exports.upload = multer({ storage: storage });
