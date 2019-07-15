const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

module.exports.setUser = (login, accessToken, refreshToken) => {
  pool.query(
    `CALL setUser('${login}', '${accessToken}', '${refreshToken}')`,
    error => {
      if (error) throw error;
    }
  );
};

module.exports.getSessionId = login => {
  pool.query(
    `CALL getSessionId('${login}')`,
    (error, results) => {
      if (error) throw error;
      return results[0].session_id;
    }
  );
};

module.exports.setSessionId = (login, sessionId) => {
  pool.query(
    `CALL setSessionId('${login}', '${sessionId}')`,
    error => {
      if (error) throw error;
    }
  );
};
