const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const team = require("./routes/team");
const poll = require("./routes/poll");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();


app.use("/auth", auth);

app.use("/team", team);

app.use("/poll", poll);

app.listen(process.env.PORT || PORT, () => {
  console.log("Running Server on port " + process.env.PORT);
});
