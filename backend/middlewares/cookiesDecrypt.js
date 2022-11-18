const jwt = require("jsonwebtoken");
module.exports.addUserToRequestObject = async (req, res, next) => {
  if (!req.cookies.user) {
    next();
    return;
  }
  let user = req.cookies.user;
  user = jwt.verify(user, process.env.JWT_SECRET);
  req.user = user;
  next();
};
