const express = require("express");
const bot = express.Router();
const chatbot = require("./../chatbot/chatbot");

bot.get("/connect", (req, res) => {
  if (req.user) {
    chatbot.connect(req.user.data[0].display_name);
  }
});

bot.get("/disconnect", (req, res) => {
  if (req.user) {
    chatbot.disconnect(req.user.data[0].display_name);
  }
});

bot.get("/isConnected", (req, res) => {
  if (chatbot.isConnected) {
    res.json({ connected: "true" });
  } else {
    res.json({ connected: "false" });
  }
})

module.exports = bot;
