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

router.post("/ended", (req, res) => {
  let pollname = req.body.pollname;
  let ended = req.body.ended;
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

router.post("/endpoll", (req, res) => {
  let pollname = req.body.pollname;
  let ended = req.body.ended;
  console.log("endpoll", pollname, ended);
  db.query(
    "UPDATE pollList SET ended = ? WHERE pollname = ?",
    [ended, pollname],
    (err, result) => {
      res.send({ result });
    }
  );
});

router.post("/result", (req, res) => {
  let pollname = req.body.pollname;
  //let ended = "ended";
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

router.post("/mypolls", (req, res) => {
  let teamid = req.body.teamid;
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

router.post("/polllist", (req, res) => {
  let pollname = req.body.pollname;
  let question = req.body.question;
  let option0 = req.body.option0;
  let option1 = req.body.option1;
  let option2 = req.body.option2;
  let option3 = req.body.option3;
  let option4 = req.body.option4;
  let option5 = req.body.option5;
  let option6 = req.body.option6;
  let option7 = req.body.option7;
  let option8 = req.body.option8;
  let option9 = req.body.option9;
  let teamid = req.body.teamid;
  let pollteamid = req.body.pollteamid;
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
});

router.post("/pollAdd", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let teamid = req.body.teamid;
  let pollname = req.body.pollname;
  let selectedoption = req.body.selectedoption;
  let userpollid = req.body.userpollid;
  db.query(
    "INSERT IGNORE INTO poll (username,password,teamid,pollname,selectedoption,userpollid) VALUES (?,?,?,?,?,?)",
    [username, password, teamid, pollname, selectedoption, userpollid]
  );
});

router.post("/polling", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let teamname = req.body.teamname;
  let teamdes = req.body.teamdes;
  let pollname = req.body.pollname;
  let selectedoption = req.body.selectedoption;
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

router.post("/pollCheck", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let teamid = req.body.teamid;
  let pollname = req.body.pollname;

  console.log("pollCheck");
  db.query(
    "SELECT * FROM poll WHERE username = ? AND password = ? AND teamid = ? AND pollname = ?",
    [username, password, teamid, pollname],
    (err, result) => {
      res.send({ result });
    }
  );
});

module.exports = router;
