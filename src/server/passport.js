const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const request = require("request");
const mysql = require("mysql");

module.exports = (passport, OAuth2Strategy) => {
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

        let connection = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_DATABASE
        });
        connection.connect();
        connection.query(
          `CALL insertUser` +
            `('${profile.data[0].login}', ` +
            `'${profile.accessToken}', ` +
            `'${profile.refreshToken}')`,
          error => {
            if (error) throw error;
          }
        );
        connection.end();

        done(null, profile);
      }
    )
  );
};
