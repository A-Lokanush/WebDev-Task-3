const router = require("express").Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const verify = require("../middlewares/verify");

dotenv.config();

router.post("/register", (req, res) => {
  var username = req.body.username;
  var Password = req.body.password;
  const password = bcrypt.hashSync(Password, 10);
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
    "SELECT * FROM USERS WHERE username = ? ",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        for( let i = 0; i < result.length; i++){
          if (bcrypt.compareSync(password, result[i].password)) {
            const accessToken = jwt.sign({ username: result[i].username, password: result[i].password}, process.env.SECRET_KEY , {
              expiresIn: "30m",
            });
            const refreshToken = jwt.sign({ username: result[i].username, password: result[i].password}, process.env.REFRESH_KEY , {
              expiresIn: "30m",
            });
            res.status(200).send({
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          }
        }          
      } else {
        res.send({ message: "INVALID CREDENTIALS" });
      }
    }
  );
});


router.post('/test',verify,(req, res) => {
  res.send({ message: "You are authenticated" });
});

router.post("/refresh", (req, res) => {
  var refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
    if (err) {
      res.send({ message: "Invalid Token" });
    } else {
      const newAccessToken = jwt.sign({ username: decoded.username, password: decoded.password}, process.env.SECRET_KEY , {
        expiresIn: "30m",
      });
      const newRefreshToken = jwt.sign({ username: decoded.username, password: decoded.password}, process.env.REFRESH_KEY , {
        expiresIn: "30m",
      });
      res.send({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }
  });
})

module.exports = router;
