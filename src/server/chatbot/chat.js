const twitch = require("./twitch");

require("dotenv").config();

module.exports.say = (twitchClient, channel, response) => {
  twitchClient.say(channel, response);
};

module.exports.goodbye = (twitchClient, channel, userstate, response) => {
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
      respondInTwitchChatWithUpTime(channel, json, twitchClient);
    });
};

function isNotEmptyArray(json) {
  return Array.isArray(json.data) && json.data.length > 0;
}

function calculateElapsedStreamTime(json) {
  return new Date(Date.now() - Date.parse(json.data[0].started_at));
}

function respondInTwitchChatWithUpTime(channel, json, twitchClient) {
  if (isNotEmptyArray(json)) {
    let streamUpTime = calculateElapsedStreamTime(json);
    twitchClient.say(
      channel,
      `${channel} has been live for ${streamUpTime.getUTCHours()} hours and ${streamUpTime.getUTCMinutes()} minutes.`
    );
  } else {
    twitchClient.say(channel, `${channel} is currently offline.`);
  }
}
