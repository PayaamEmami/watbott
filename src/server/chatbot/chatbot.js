const chat = require("./chat");
const database = require("./../database");
const process = require("process");
const tmi = require("tmi.js");
const watson = require("./watson");

require("dotenv").config();

const opts = {
  identity: {
    username: process.env.TWITCH_BOT_NAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: []
};
const twitchClient = new tmi.client(opts);

twitchClient.connect();

module.exports.join = async channel => {
  try {
    twitchClient.join(channel);
  } catch (err) {
    console.error(err);
  }
};

module.exports.part = async channel => {
  try {
    twitchClient.part(channel);
  } catch (err) {
    console.error(err);
  }
};

module.exports.isInChannel = channel => {
  if (twitchClient.getChannels().includes("#" + channel)) {
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
  database.getSessionId(channel, sessionId => {
    watson.deleteSession(sessionId).catch(err => {
      console.error(err);
    });
  });
});

twitchClient.on("chat", (channel, userstate, message, self) => {
  if (!self && message.toLowerCase().includes(process.env.TWITCH_BOT_NAME)) {
    database.getSessionId(userstate["username"], sessionId => {
      watson
        .message(message, sessionId)
        .then(res => {
          let userIntent = res.output.intents[0].intent;
          let watsonResponse = res.output.generic[0].text;

          switch (userIntent) {
            case "Twitch_Uptime":
              chat.upTime(twitchClient, channel);
              break;
            case "General_Ending":
              chat.ending(twitchClient, channel, userstate, watsonResponse);
              break;
            default:
              chat.say(twitchClient, channel, watsonResponse);
          }
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
});
