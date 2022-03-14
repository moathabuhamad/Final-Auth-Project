"use strict";

const cors = require("cors");
const express = require("express");
const signUprouter = require("./routes/signup");
const signInrouter = require("./routes/signin");

const app = express();

app.use(express.json());
app.use(cors());
app.use(signUprouter);
app.use(signInrouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// app.use(errorHandle500);
// app.use("*", errorHandle404);

function start(port) {
  app.listen(port, () => {
    console.log(`Server online through port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
