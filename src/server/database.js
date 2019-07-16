const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

module.exports.setUser = (login, accessToken, refreshToken) => {
  login = filterLogin(login);

  pool.query(
    `CALL setUser('${login}', '${accessToken}', '${refreshToken}')`,
    error => {
      if (error) throw error;
    }
  );
};

module.exports.getSessionId = (login, callback) => {
  login = filterLogin(login);

  pool.query(`CALL getSessionId('${login}')`, (error, results, fields) => {
    if (error) throw error;
    callback(results[0][0].session_id);
  });
};

module.exports.setSessionId = (login, sessionId) => {
  login = filterLogin(login);

  pool.query(`CALL setSessionId('${login}', '${sessionId}')`, error => {
    if (error) throw error;
  });
};

function filterLogin(login) {
  return login.replace("#", "");
}
