const mongoose = require("mongoose");
require("dotenv").config();
const password = process.env.DATABASE_PASSWORD;
mongoose.connect(`mongodb://localhost:27017/todo`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("database connected");
});
module.exports = db;
