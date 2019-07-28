const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const cors = require("cors");
const app = express();
const user = require("./routes/user");
const bot = require("./routes/bot");
const auth = require("./routes/auth")

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
app.use("/auth", auth);
app.use("/api/user", user);
app.use("/api/bot", bot);

app.listen(process.env.PORT, () => console.log("Server started"));
