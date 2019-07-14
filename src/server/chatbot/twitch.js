const fetch = require("node-fetch");

require("dotenv").config();

module.exports.getStream = async channel => {
  try {
    return await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${channel}`,
      {
        method: "GET",
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};
