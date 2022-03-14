"use strict";

// const { Users } = require("../models/index");
const base64 = require("base-64");

const {Usermodel} =require('../models/index');

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    let encodedPart = req.headers.authorization.split(" ")[1];
    console.log(encodedPart);
    let decoded = base64.decode(encodedPart);
    console.log(decoded);
    let [username, password] = decoded.split(":");
    console.log(username,password);
    try {
        console.log("*******Moath********")
        let validUser = await Usermodel.authenticateBasic(username, password);
        req.user = validUser;
        next();
    } catch (err) {
      res.status(403).send(err);
    }
  } else {
    next("Not Autherised");
  }
};
