"use strict";

const { Usermodel } = require("../models/index");

module.exports = async (req, res, next) => {
  if (req.headers["authorization"]) {
    let token = req.headers.authorization.split(" ")[1];
    try {
      let user = await Usermodel.validateToken(token);
      req.user = user;
      next();
    } catch (err) {
      res.status(403).send(`Invalid user ${err}`);
    }
  }else{
    next("invalid user");
  }
};