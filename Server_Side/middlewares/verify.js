const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verify = (req, res, next) => {
  const token = req.body.accessToken;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Invalid Token",
        });
      } else {
        req.decoded = decoded;
        console.log("Verify",decoded);
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "No Token Provided",
    });
  }
};

module.exports = verify;
