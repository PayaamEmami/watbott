require("dotenv").config();
const chat = require("./chat");
const database = require("./database");
const process = require("process");
const tmi = require("tmi.js");
const watson = require("./watson");

let opts = {
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: []
};
let twitchClient = new tmi.client(opts);

module.exports.connect = async channelName => {
  try {
    this.opts.channels = this.opts.channels.push(channelName);
    twitchClient.connect();
  } catch (err) {
    console.error(err);
  }
};

module.exports.disconnect = async channelName => {
  try {
    const tempOpts = {
      identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
      },
      channels: [channelName]
    };
    const tempClient = new tmi.client(tempOpts);
    const sessionId = database.getSessionId(profile.data[0].login);

    tempClient.disconnect();

    watson.deleteSession(sessionId);

    this.opts.channels.splice(this.opts.channels.indexOf(channelName), 1);
  } catch (err) {
    console.error(err);
  }
};

twitchClient.on("connected", (address, port) => {
  // DEV ONLY
  console.log(`* Connected to ${address}:${port}`);

  watson
    .createSession()
    .then(res => {
      database.setSessionId(res.session_id);
    })
    .catch(err => {
      console.error(err);
    });
});

twitchClient.on("message", (channel, userstate, message, self) => {
  if (self) {
    return;
  }

  if (message.toLowerCase().includes(process.env.TWITCH_BOT_USERNAME)) {
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
            chat.message(twitchClient, channel, response);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
});

twitchClient.on("disconnected", reason => {
  // DEV ONLY
  console.log(`* Disconnected: ${reason}`);

  const sessionId = database.getSessionId(profile.data[0].login);

  watson
    .deleteSession(sessionId)
    .then(res => {
      console.log("* Watson session deleted.");
    })
    .catch(err => {
      console.error(err);
    });
});
