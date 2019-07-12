const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

module.exports.getSessionId = channelName => {
  let sessionId = null;

  connection.connect();
  connection.query(
    `SELECT session_id FROM user WHERE user.login='${channelName}'`,
    (error, results) => {
      if (error) throw error;
      sessionId = results[0].session_id;
    }
  );
  connection.end();

  return sessionId;
};

module.exports.setSessionId = (channelName, sessionId) => {
  connection.connect();
  connection.query(
    `CALL insertWatsonSession` +
      `('${channelName}', ` +
      `'${sessionId}')`,
    error => {
      if (error) throw error;
    }
  );
  connection.end();
};
