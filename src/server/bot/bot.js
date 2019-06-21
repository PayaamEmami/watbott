require("dotenv").config();
const chat = require("./chat");
const process = require("process");
const tmi = require("tmi.js");
const watson = require("./watson");

const opts = {
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: [process.env.TWITCH_CHANNEL_USERNAME]
};
const twitchClient = new tmi.client(opts);
let session_id;

twitchClient.connect();

twitchClient.on("connected", (address, port) => {
  console.log(`* Connected to ${address}:${port}`);
  watson
    .createSession()
    .then(res => {
      session_id = res.session_id;
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
    watson
      .message(message, session_id)
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
  console.log(`* Disconnected: ${reason}`);
  watson
    .deleteSession(session_id)
    .then(res => {
      console.log("* Watson session deleted.");
    })
    .catch(err => {
      console.error(err);
    });
});
