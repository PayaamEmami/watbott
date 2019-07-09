const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const cors = require("cors");
const app = express();
const routes = require('./routes/routes');
const user = require('./routes/user');
const bot = require('./routes/bot');

require("dotenv").config();
require("./passport")(passport, OAuth2Strategy);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ credentials: true, origin: true }));

app.get(
  "/auth/twitch",
  passport.authenticate("twitch", { scope: "user_read" })
);

app.get(
  "/auth/twitch/callback",
  passport.authenticate("twitch", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.use('/api/user', user);
app.use('/api/bot', bot);
app.use('/', routes);

app.listen(process.env.PORT, () => console.log("Server started"));
