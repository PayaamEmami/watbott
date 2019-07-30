const chat = require("./chat");
const database = require("./../database");
const process = require("process");
const tmi = require("tmi.js");
const watson = require("./watson-client");

require("dotenv").config();

const opts = {
  identity: {
    username: process.env.TWITCH_BOT_NAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: []
};
const tmiClient = new tmi.client(opts);

tmiClient.connect();

module.exports.join = async channel => {
  try {
    tmiClient.join(channel);
  } catch (err) {
    console.error(err);
  }
};

module.exports.part = async channel => {
  try {
    tmiClient.part(channel);
  } catch (err) {
    console.error(err);
  }
};

module.exports.isInChannel = channel => {
  if (tmiClient.getChannels().includes("#" + channel)) {
    return true;
  } else {
    return false;
  }
};

tmiClient.on("join", (channel, username, self) => {
  watson
    .createSession()
    .then(res => {
      database.setSessionId(filterChannelName(channel), res.session_id);
    })
    .catch(err => {
      console.error(err);
    });
});

tmiClient.on("part", (channel, username, self) => {
  database.getSessionId(filterChannelName(channel), sessionId => {
    watson.deleteSession(sessionId).catch(err => {
      console.error(err);
    });
  });
});

tmiClient.on("chat", (channel, userstate, message, self) => {
  if (isMessageTaggingBot(self, message)) {
    database.getSessionId(userstate["username"], sessionId => {
      watson
        .sendMessage(message, sessionId)
        .then(res => {
          respondInTwitchChat(
            filterChannelName(channel),
            res.output.intents[0].intent,
            res.output.generic[0].text
          );
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
});

function filterChannelName(channel) {
  return channel.replace("#", "");
}

function isMessageTaggingBot(self, message) {
  return !self && message.toLowerCase().includes(process.env.TWITCH_BOT_NAME);
}

function respondInTwitchChat(channel, userIntent, watsonResponse) {
  switch (userIntent) {
    case "Twitch_Uptime":
      chat.upTime(tmiClient, channel);
      break;
    case "General_Ending":
      chat.goodbye(tmiClient, channel, userstate, watsonResponse);
      break;
    default:
      chat.say(tmiClient, channel, watsonResponse);
  }
}
