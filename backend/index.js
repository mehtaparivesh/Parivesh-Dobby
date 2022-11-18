// importing modules
const express = require("express");
// to parse req.body into json
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
// to connect with mongodb

const dataBase = require("./config/database");
const addUserToRequestObject =
  require("./middlewares/cookiesDecrypt").addUserToRequestObject;

// initialising the app
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://parivesh-dobby.vercel.app"],
  })
);
// importing environmen variables
require("dotenv").config();

// middlewares
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(addUserToRequestObject);

// defining the path
app.use("/", require("./routes/index"));

// listening on port process.enc.port
app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT || 8000}`);
});
