const express = require("express");
const bot = express.Router();
const chatbot = require("./../chatbot/chatbot");

bot.put("/join", (req, res) => {
  chatbot.join(req.user.data[0].display_name);
  res.status(204).end();
});

bot.put("/part", (req, res) => {
  chatbot.part(req.user.data[0].display_name);
  res.status(204).end();
});

bot.get("/isInChannel", (req, res) => {
  if (chatbot.isInChannel(req.user.data[0].display_name)) {
    res.json({ isInChannel: true });
  } else {
    res.json({ isInChannel: false });
  }
});

module.exports = bot;
