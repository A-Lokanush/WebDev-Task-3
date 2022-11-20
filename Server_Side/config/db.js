const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  socketPath: "/run/mysqld/mysqld.sock",
  host: "localhost",
  port: "3306",
  user: "root",
  password: "#Pammal2002.",
  database: "pollbooth",
});

module.exports = db;
