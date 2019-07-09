const twitch = require("./twitch");

require("dotenv").config();

module.exports.message = (twitchClient, channel, response) => {
  twitchClient.say(channel, response);
};

module.exports.ending = (twitchClient, channel, userstate, response) => {
  this.message(twitchClient, channel, response);
  if (userstate.username == process.env.TWITCH_CHANNEL_USERNAME) {
    twitchClient.disconnect();
  }
};

module.exports.upTime = (twitchClient, channel) => {
  twitch
    .getStream()
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (Array.isArray(json.data) && json.data.length > 0) {
        let time = new Date(Date.now() - Date.parse(json.data[0].started_at));
        twitchClient.say(
          channel,
          `${
            process.env.TWITCH_CHANNEL_USERNAME
          } has been live for ${time.getUTCHours()} hours and ${time.getUTCMinutes()} minutes.`
        );
      } else {
        twitchClient.say(
          channel,
          `${process.env.TWITCH_CHANNEL_USERNAME} is currently offline.`
        );
      }
    });
};
