const express = require("express");
const api = express.Router();

api.get("/user/auth", (req, res) => {
  if (req.user) {
    res.json({ auth: "true" });
  } else {
    res.json({ auth: "false" });
  }
});

api.get("/user/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.BASE_URL);
});

api.get("/user/info", (req, res) => {
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


module.exports = api;
