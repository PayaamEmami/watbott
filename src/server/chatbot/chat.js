const twitch = require("./twitch");

require("dotenv").config();

module.exports.say = (twitchClient, channel, response) => {
  twitchClient.say(channel, response);
};

module.exports.ending = (twitchClient, channel, userstate, response) => {
  this.say(twitchClient, channel, response);
  if (userstate.username == channel) {
    twitchClient.disconnect();
  }
};

module.exports.upTime = (twitchClient, channel) => {
  twitch
    .getStream(channel)
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (Array.isArray(json.data) && json.data.length > 0) {
        let time = new Date(Date.now() - Date.parse(json.data[0].started_at));
        twitchClient.say(
          channel,
          `${channel} has been live for ${time.getUTCHours()} hours and ${time.getUTCMinutes()} minutes.`
        );
      } else {
        twitchClient.say(
          channel,
          `${channel} is currently offline.`
        );
      }
    });
};
