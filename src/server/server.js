require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const request = require("request");
const cors = require("cors");
const app = express();

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

OAuth2Strategy.prototype.userProfile = (accessToken, done) => {
  var options = {
    url: "https://api.twitch.tv/helix/users",
    method: "GET",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Accept: "application/vnd.twitchtv.v5+json",
      Authorization: "Bearer " + accessToken
    }
  };

  request(options, (error, response, body) => {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  "twitch",
  new OAuth2Strategy(
    {
      authorizationURL: "https://id.twitch.tv/oauth2/authorize",
      tokenURL: "https://id.twitch.tv/oauth2/token",
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      state: true
    },
    (accessToken, refreshToken, profile, done) => {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;

      done(null, profile);
    }
  )
);

app.get("/auth", (req, res) => {
  if (req.user) {
    res.json({ auth: "true" });
  } else {
    res.json({ auth: "false" });
  }
});

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

app.get("/user/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:4200");
});

app.get("/user/info", (req, res) => {
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

app.get("/", (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    res.redirect("http://localhost:4200/dashboard");
  } else {
    res.redirect("http://localhost:4200");
  }
});

app.listen(process.env.PORT, () => console.log("Server started"));
