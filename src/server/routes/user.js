const express = require("express");
const user = express.Router();
const database = require("./../database");

user.get("/", (req, res) => {
  if (req.user) {
    database.getWhitelist(req.user.data[0].display_name, whitelistUser => {
      const isWhitelisted = req.user.data[0].display_name === whitelistUser;
      res.json({
        login: req.user.data[0].display_name,
        image: req.user.data[0].profile_image_url,
        isWhitelisted: isWhitelisted
      });
    });
  }
});

module.exports = user;
