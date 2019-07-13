const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

connection.connect();

module.exports.insertUser = (login, accessToken, refreshToken) => {
  connection.query(
    `CALL insertUser('${login}', '${accessToken}', '${refreshToken}')`,
    error => {
      if (error) throw error;
    }
  );
};

module.exports.getSessionId = channelName => {
  let sessionId = null;

  connection.query(
    `SELECT session_id FROM users WHERE users.login='${channelName}'`,
    (error, results) => {
      if (error) throw error;
      sessionId = results[0].session_id;
    }
  );

  return sessionId;
};

module.exports.setSessionId = (channelName, sessionId) => {
  connection.query(
    `CALL insertWatsonSession('${channelName}', '${sessionId}')`,
    error => {
      if (error) throw error;
    }
  );
};
