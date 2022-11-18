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

// importing environmen variables
require("dotenv").config();
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://parivesh-dobby.vercel.app"],
};
// middlewares
app.use(cors(corsOptions));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// for extracting user from req.cookies
app.use(addUserToRequestObject);


// defining the path
app.use("/", require("./routes/index"));

// listening on port process.enc.port
app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT || 8000}`);
});
