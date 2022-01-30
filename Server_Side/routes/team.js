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

router.post("/teamlist", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let teamname = req.body.teamname;
  let teamdes = req.body.teamdes;
  let teamid = req.body.teamid;
  let admin = req.body.admin;
  let userteamid = req.body.userteamid;
  console.log("teamlist", username, password, teamname, teamdes);
  db.query(
    "INSERT IGNORE INTO teamList (username,password,teamname,teamdes,teamid,admin,userteamid) VALUES (?,?,?,?,?,?,?)",
    [username, password, teamname, teamdes, teamid, admin, userteamid]
  );
});

//join teamlist
router.post("/jointeamlist", (req, res) => {
  //only team  id needed=
  // let username = req.body.username;
  // let password = req.body.password;
  let teamid = req.body.teamid;
  console.log("teamlist in app.js expressss ", teamid);
  db.query(
    "SELECT * FROM teamList WHERE teamid = ?",
    [teamid],
    (err, result) => {
      //if(result.length > 0) {
      res.send({ result });
      //} else {
      //	res.send({message:"NO TEAMS"})
      //}
    }
  );
});

router.post("/myteams", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log("myteams", username, password);
  db.query(
    "SELECT * FROM teamList WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      //if(result.length > 0) {
      res.send({ result });
      //} else {
      //	res.send({message:"NO TEAMS"})
      //}
    }
  );
});

router.post("/teamMember", (req, res) => {
  var teamid = req.body.teamid;
  console.log("teamMember");
  db.query(
    "SELECT * FROM teamList WHERE teamid = ?",
    [teamid],
    (err, result) => {
      //if(result.length > 0) {
      res.send({ result });
      //} else {
      //	res.send({message:"NO TEAMS"})
      //}
    }
  );
});

module.exports = router;
