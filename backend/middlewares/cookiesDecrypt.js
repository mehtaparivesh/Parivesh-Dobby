const jwt = require("jsonwebtoken");
// to set user in req object
module.exports.addUserToRequestObject = async (req, res, next) => {
  if (!req.cookies.user) {
    next();
    return;
  }
  let user = req.cookies.user;
  user = jwt.verify(user, process.env.JWT_SECRET);
  if (user) {
    req.user = user;
  } else {
    return res.eraseCookie("user").json({ success: false, message: "bad request" });
  }
  next();
};
