const express = require("express");
const passport = require("passport");
const auth = express.Router();

auth.get("/", (req, res) => {
  if (req.user) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

auth.get("/twitch", passport.authenticate("twitch", { scope: "user_read" }));

auth.get(
  "/twitch/callback",
  passport.authenticate("twitch", {
    successRedirect: process.env.BASE_URL + "/dashboard",
    failureRedirect: process.env.BASE_URL
  })
);

auth.put("/logout", (req, res) => {
  req.logout();
  res.json({ isAuthenticated: false });
});

module.exports = auth;
