const tmi = require("tmi.js");
const twitchClient = require("./twitch-client");

require("dotenv").config();

const opts = {
  identity: {
    username: process.env.TWITCH_BOT_NAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: []
};

module.exports.tmiClient = new tmi.client(opts);

module.exports.say = (channel, response) => {
  this.tmiClient.say(channel, response);
};

module.exports.goodbye = (channel, userstate, response) => {
  this.say(channel, response);
  if (userstate.username == channel) {
    this.tmiClient.disconnect();
  }
};

module.exports.upTime = channel => {
  twitchClient
    .getStream(channel)
    .then(res => {
      return res.json();
    })
    .then(json => {
      respondInTwitchChatWithUpTime(this.tmiClient, channel, json);
    });
};

function isNotEmptyArray(json) {
  return Array.isArray(json.data) && json.data.length > 0;
}

function calculateElapsedStreamTime(json) {
  return new Date(Date.now() - Date.parse(json.data[0].started_at));
}

function respondInTwitchChatWithUpTime(tmiClient, channel, json) {
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
