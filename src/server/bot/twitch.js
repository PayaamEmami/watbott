require("dotenv").config();
const fetch = require("node-fetch");

module.exports.getStream = async () => {
  try {
    return await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${
        process.env.TWITCH_CHANNEL_USERNAME
      }`,
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
