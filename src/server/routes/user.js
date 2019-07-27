const express = require("express");
const user = express.Router();
const database = require("./../database");

require("dotenv").config();

user.get("/auth", (req, res) => {
  if (req.user) {
    res.json({ auth: true });
  } else {
    res.json({ auth: false });
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
        login: req.user.data[0].display_name,
        image: req.user.data[0].profile_image_url
      });
    } else {
      res.json({
        login: req.user.data[0].display_name,
        image: null
      });
    }
  } else {
    res.json({
      login: null,
      image: null
    });
  }
});

user.get("/whitelist", (req, res) => {
  if (req.user) {
    database.getWhitelist(req.user.data[0].display_name, whitelistUser => {
      if (req.user.data[0].display_name === whitelistUser) {
        res.json({ whitelist: true });
      } else {
        res.json({ whitelist: false });
      }
    });
  }
});

module.exports = user;
