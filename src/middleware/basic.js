"use strict";

const { Users } = require("../models/index");
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      let validUser = async function authenticateBasic (username,password) {
        try {
            const student = await this.findOne({where:{username:username}});
            const valid = await bcrypt.compare(password,student.password);
            if(valid) {
                let newToken = jwt.sign({exp:Math.floor(Date.now()/1000)+900,username:student.username},SECRET);
                student.token = newToken;
                return student;
            } else {
      
                throw new Error('Invalid password');
            }
        } catch(error) {
           throw new Error(`error ,${error}`);
        }
      };
      console.log(validUser);
      req.user = validUser;
      next();
    } catch (err) {
      res.status(403).send(err);
    }
  } else {
    next("Not Autherised");
  }
};
