const tmiDecorator = require("./tmi-decorator");
const database = require("./../database");
const watsonClient = require("./watson-client");

require("dotenv").config();

tmiDecorator.tmiClient.connect();

module.exports.join = async channel => {
  try {
    tmiDecorator.tmiClient.join(channel);
  } catch (err) {
    console.error(err);
  }
};

module.exports.part = async channel => {
  try {
    tmiDecorator.tmiClient.part(channel);
  } catch (err) {
    console.error(err);
  }
};

module.exports.isInChannel = channel => {
  if (tmiDecorator.tmiClient.getChannels().includes("#" + channel)) {
    return true;
  } else {
    return false;
  }
};

tmiDecorator.tmiClient.on("join", (channel, username, self) => {
  watsonClient
    .createSession()
    .then(res => {
      database.setSessionId(filterChannelName(channel), res.session_id);
    })
    .catch(err => {
      console.error(err);
    });
});

tmiDecorator.tmiClient.on("part", (channel, username, self) => {
  database.getSessionId(filterChannelName(channel), sessionId => {
    watsonClient.deleteSession(sessionId).catch(err => {
      console.error(err);
    });
  });
});

tmiDecorator.tmiClient.on("chat", (channel, userstate, message, self) => {
  if (isMessageTaggingBot(self, message)) {
    database.getSessionId(userstate["username"], sessionId => {
      watsonClient
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
      tmiDecorator.upTime(channel);
      break;
    case "General_Ending":
      tmiDecorator.goodbye(channel, userstate, watsonResponse);
      break;
    default:
      tmiDecorator.say(channel, watsonResponse);
  }
}
