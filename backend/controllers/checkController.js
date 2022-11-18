module.exports.check = async (req, res) => {
  try {
    // console.log(req.user, "req.user in check");
    if (req.user) {
      // if request has user
      return res.json({ success: true, isLoggedIn: true });
    } else {
      // if request doesnt have user
      return res.json({ success: true, isLoggedIn: false });
    }
  } catch (err) {
    console.log(err);
  }
};
