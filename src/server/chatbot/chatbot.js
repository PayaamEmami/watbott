const chat = require("./chat");
const database = require("../database");
const process = require("process");
const tmi = require("tmi.js");
const watson = require("./watson");

require("dotenv").config();

let opts = {
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: []
};
let twitchClient = new tmi.client(opts);

twitchClient.connect();

module.exports.join = async channelName => {
  try {
    twitchClient.join(channelName);
  } catch (err) {
    console.error(err);
  }
};

module.exports.part = async channelName => {
  try {
    twitchClient.part(channelName);
  } catch (err) {
    console.error(err);
  }
};

module.exports.isInChannel = channelName => {
  if (twitchClient.getChannels().includes(channelName)) {
    return true;
  } else {
    return false;
  }
};

twitchClient.on("join", (channel, username, self) => {
  watson
    .createSession()
    .then(res => {
      database.setSessionId(channel, res.session_id);
    })
    .catch(err => {
      console.error(err);
    });
});

twitchClient.on("part", (channel, username, self) => {
  const sessionId = database.getSessionId(channel);

  watson
    .deleteSession(sessionId)
    .then(res => {
      console.log("* Watson session deleted.");
    })
    .catch(err => {
      console.error(err);
    });
});

twitchClient.on("message", (channel, userstate, message, self) => {
  if (!self && message.toLowerCase().includes(process.env.TWITCH_BOT_USERNAME)) {
    const sessionId = database.getSessionId(profile.data[0].login);

    watson
      .message(message, sessionId)
      .then(res => {
        let response = res.output.generic[0].text;
        let intent = res.output.intents[0].intent;
        switch (intent) {
          case "Twitch_Uptime":
            chat.upTime(twitchClient, channel);
            break;
          case "General_Ending":
            chat.ending(twitchClient, channel, userstate, response);
            break;
          default:
            chat.say(twitchClient, channel, response);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
});
