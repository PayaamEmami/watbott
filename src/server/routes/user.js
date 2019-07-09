const express = require("express");
const user = express.Router();

user.get("/auth", (req, res) => {
  if (req.user) {
    res.json({ auth: "true" });
  } else {
    res.json({ auth: "false" });
  }
});

user.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.BASE_URL);
});

user.get("/info", (req, res) => {
  if (req.user) {
    if (req.user.data[0].profile_image_url) {
      res.json({
        username: req.user.data[0].display_name,
        userImage: req.user.data[0].profile_image_url
      });
    } else {
      res.json({
        username: req.user.data[0].display_name,
        userImage: null
      });
    }
  } else {
    res.json({
      username: null,
      userImage: null
    });
  }
});

module.exports = user;
