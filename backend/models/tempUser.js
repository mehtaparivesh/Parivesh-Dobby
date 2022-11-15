const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    verified: Boolean,
    records: {},
    race_records: {},
    dogeCoins: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("tempUser", tempUserSchema);
