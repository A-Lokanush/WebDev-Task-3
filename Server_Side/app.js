const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth")

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.use("/auth",auth);

//team-list
app.post("/teamlist", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var teamname = req.body.teamname;
  var teamdes = req.body.teamdes;
  var teamid = req.body.teamid;
  var admin = req.body.admin;
  var userteamid = req.body.userteamid;
  console.log("teamlist", username, password, teamname, teamdes);
  db.query(
    "INSERT IGNORE INTO teamList (username,password,teamname,teamdes,teamid,admin,userteamid) VALUES (?,?,?,?,?,?,?)",
    [username, password, teamname, teamdes, teamid, admin, userteamid]
  );
  username = null;
  password = null;
  teamname = null;
  teamdes = null;
  teamid = null;
});

//join teamlist
app.post("/jointeamlist", (req, res) => {
  //only team  id needed=
  // var username = req.body.username;
  // var password = req.body.password;
  var teamid = req.body.teamid;
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
app.post("/addjointeamlist", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var teamname = req.body.teamname;
  var teamdes = req.body.teamdes;
  var teamid = req.body.teamid;
  console.log("teamlist", username, password, teamname, teamdes);
  db.query(
    "INSERT IGNORE INTO teamList (username,password,teamname,teamdes,teamid) VALUES (?,?,?,?,?)",
    [username, password, teamname, teamdes, teamid]
  );
  username = null;
  password = null;
  teamname = null;
  teamdes = null;
  teamid = null;
});
app.post("/myteams", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
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

app.post("/ended", (req, res) => {
  var pollname = req.body.pollname;
  var ended = req.body.ended;
  console.log("ended", pollname, ended);
  db.query(
    "SELECT * FROM pollList WHERE pollname = ? AND ended = ?",
    [pollname, ended],
    (err, result) => {
      console.log("eneded result", result);
      res.send({ result });
    }
  );
});
app.post("/endpoll", (req, res) => {
  var pollname = req.body.pollname;
  var ended = req.body.ended;
  console.log("endpoll", pollname, ended);
  db.query(
    "UPDATE pollList SET ended = ? WHERE pollname = ?",
    [ended, pollname],
    (err, result) => {
      res.send({ result });
    }
  );
});
app.post("/result", (req, res) => {
  var pollname = req.body.pollname;
  //var ended = "ended";
  console.log("result", pollname);
  db.query(
    "SELECT * FROM poll WHERE pollname = ? ",
    [pollname],
    (err, result) => {
      console.log(result);
      res.send({ result });
    }
  );
});
//polllist
app.post("/mypolls", (req, res) => {
  var teamid = req.body.teamid;
  console.log("mypolls", teamid);
  db.query(
    "SELECT * FROM pollList WHERE  teamid = ?",
    [teamid],
    (err, result) => {
      //if(result.length > 0) {
      res.send({ result });
      //} else {
      //res.send({message:"NO POLLS"})
      //}
    }
  );
});

app.post("/polllist", (req, res) => {
  var pollname = req.body.pollname;
  var question = req.body.question;
  var option0 = req.body.option0;
  var option1 = req.body.option1;
  var option2 = req.body.option2;
  var option3 = req.body.option3;
  var option4 = req.body.option4;
  var option5 = req.body.option5;
  var option6 = req.body.option6;
  var option7 = req.body.option7;
  var option8 = req.body.option8;
  var option9 = req.body.option9;
  var teamid = req.body.teamid;
  var pollteamid = req.body.pollteamid;
  console.log(
    "polllist polllist",
    pollname,
    question,
    option0,
    option1,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
    option9,
    teamid
  );
  db.query(
    "INSERT IGNORE INTO pollList (pollname,question,option0,option1,option2,option3,option4,option5,option6,option7,option8,option9,teamid,pollteamid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      pollname,
      question,
      option0,
      option1,
      option2,
      option3,
      option4,
      option5,
      option6,
      option7,
      option8,
      option9,
      teamid,
      pollteamid,
    ]
  );
  pollname = null;
  question = null;
  option0 = null;
  option1 = null;
  option2 = null;
  option3 = null;
  option4 = null;
  option5 = null;
  option6 = null;
  option7 = null;
  option8 = null;
  option9 = null;
  teamid = null;
});

app.post("/pollAdd", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var teamid = req.body.teamid;
  var pollname = req.body.pollname;
  var selectedoption = req.body.selectedoption;
  var userpollid = req.body.userpollid;
  db.query(
    "INSERT IGNORE INTO poll (username,password,teamid,pollname,selectedoption,userpollid) VALUES (?,?,?,?,?,?)",
    [username, password, teamid, pollname, selectedoption, userpollid]
  );
  username = null;
  password = null;
  teamid = null;
  pollname = null;
  selectedoption = null;
});

app.post("/polling", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var teamname = req.body.teamname;
  var teamdes = req.body.teamdes;
  var pollname = req.body.pollname;
  var selectedoption = req.body.selectedoption;
  console.log(
    "polllinggggggggggg",
    username,
    password,
    teamname,
    teamdes,
    pollname,
    selectedoption
  );
  db.query(
    "UPDATE poll SET selectedoption = ? WHERE username = ? AND password = ? AND teamname = ? AND teamdes = ? AND pollname = ? ",
    [selectedoption, username, password, teamname, teamdes, pollname]
  );
});

app.post("/pollCheck", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var teamid = req.body.teamid;
  var pollname = req.body.pollname;

  console.log("pollCheck");
  db.query(
    "SELECT * FROM poll WHERE username = ? AND password = ? AND teamid = ? AND pollname = ?",
    [username, password, teamid, pollname],
    (err, result) => {
      res.send({ result });
    }
  );
});
//members
app.post("/teamMember", (req, res) => {
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

app.listen(3002, () => {
  console.log("Running Server on port 3002");
});
