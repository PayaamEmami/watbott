const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

connection.connect();

module.exports.setUser = (login, accessToken, refreshToken) => {
  connection.query(
    `CALL setUser('${login}', '${accessToken}', '${refreshToken}')`,
    error => {
      if (error) throw error;
    }
  );
};

module.exports.getSessionId = login => {
  connection.query(
    `CALL getSessionId('${login}')`,
    (error, results) => {
      if (error) throw error;
      return results[0].session_id;
    }
  );
};

module.exports.setSessionId = (login, sessionId) => {
  connection.query(
    `CALL setSessionId('${login}', '${sessionId}')`,
    error => {
      if (error) throw error;
    }
  );
};
