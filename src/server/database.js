const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

module.exports.getSessionId = () => {
  let sessionId = null;

  connection.connect();
  connection.query(
    `SELECT session_id FROM user WHERE user.login='${profile.data[0].login}'`,
    (error, results) => {
      if (error) throw error;
      sessionId = results[0].session_id;
    }
  );
  connection.end();

  return sessionId;
};

module.exports.setSessionId = sessionId => {
  connection.connect();
  connection.query(
    `CALL insertWatsonSession` +
      `('${profile.data[0].login}', ` +
      `'${sessionId}')`,
    error => {
      if (error) throw error;
    }
  );
  connection.end();
};
