const twitchClient = require("./twitch-client");

require("dotenv").config();

module.exports.say = (tmiClient, channel, response) => {
  tmiClient.say(channel, response);
};

module.exports.goodbye = (tmiClient, channel, userstate, response) => {
  this.say(tmiClient, channel, response);
  if (userstate.username == channel) {
    tmiClient.disconnect();
  }
};

module.exports.upTime = (tmiClient, channel) => {
  twitchClient
    .getStream(channel)
    .then(res => {
      return res.json();
    })
    .then(json => {
      respondInTwitchChatWithUpTime(channel, json, tmiClient);
    });
};

function isNotEmptyArray(json) {
  return Array.isArray(json.data) && json.data.length > 0;
}

function calculateElapsedStreamTime(json) {
  return new Date(Date.now() - Date.parse(json.data[0].started_at));
}

function respondInTwitchChatWithUpTime(channel, json, tmiClient) {
  if (isNotEmptyArray(json)) {
    let streamUpTime = calculateElapsedStreamTime(json);
    tmiClient.say(
      channel,
      `${channel} has been live for ${streamUpTime.getUTCHours()} hours and ${streamUpTime.getUTCMinutes()} minutes.`
    );
  } else {
    tmiClient.say(channel, `${channel} is currently offline.`);
  }
}
