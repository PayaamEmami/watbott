require("dotenv").config();
const AssistantV2 = require("ibm-watson/assistant/v2");

const service = new AssistantV2({
  iam_apikey: process.env.WATSON_API_KEY,
  version: process.env.WATSON_VERSION,
  url: process.env.WATSON_URL
});

module.exports.createSession = async () => {
  try {
    return await service.createSession({
      assistant_id: process.env.WATSON_ASSISTANT_ID
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.message = async (msg, session_id) => {
  msg = filterMessage(msg);

  try {
    return await service.message({
      assistant_id: process.env.WATSON_ASSISTANT_ID,
      session_id: session_id,
      input: {
        message_type: "text",
        text: msg
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.deleteSession = async session_id => {
  try {
    return await service.deleteSession({
      assistant_id: process.env.WATSON_ASSISTANT_ID,
      session_id: session_id
    });
  } catch (err) {
    console.error(err);
  }
};

function filterMessage(message) {
  return message.replace(`@*${process.env.TWITCH_BOT_USERNAME}`, "").trim();
}
