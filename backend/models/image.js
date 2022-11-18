// ImgModel.js
const mongoose = require("mongoose");
var ImageSchema = new mongoose.Schema(
  {
    data: Buffer,
    contentType: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Image", ImageSchema);
