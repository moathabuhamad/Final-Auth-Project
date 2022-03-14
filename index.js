"use strict";

const { db } = require("./src/models/index.js");
const server = require("./src/server");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  server.start(PORT);
});
