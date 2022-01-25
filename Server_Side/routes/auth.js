const router = require("express").Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

router.post("/register", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username, password);
  db.query("INSERT IGNORE INTO USERS (username,password) VALUES (?,?)", [
    username,
    password,
  ]);
});

router.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log("login", username, password);
  db.query(
    "SELECT * FROM USERS WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send({ result });
      } else {
        res.send({ message: "INVALID CREDENTIALS" });
      }
    }
  );
});

module.exports = router;
