const mysql = require("mysql");
const util = require("./util/util");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

module.exports.getSessionId = (login, callback) => {
  login = util.removeHashSymbol(login);

  pool.query(`CALL getSessionId('${login}')`, (error, results, fields) => {
    if (error) throw error;
    callback(results[0][0].session_id);
  });
};

module.exports.getWhitelistUser = login => {
  login = util.removeHashSymbol(login);

  pool.query(`CALL getWhitelistUser('${login}')`, (error, results, fields) => {
    if (error) throw error;
    callback(results[0][0].login);
  });
};

module.exports.setSessionId = (login, sessionId) => {
  login = util.removeHashSymbol(login);

  pool.query(`CALL setSessionId('${login}', '${sessionId}')`, error => {
    if (error) throw error;
  });
};

module.exports.setUser = (login, accessToken, refreshToken) => {
  login = util.removeHashSymbol(login);

  pool.query(
    `CALL setUser('${login}', '${accessToken}', '${refreshToken}')`,
    error => {
      if (error) throw error;
    }
  );
};
