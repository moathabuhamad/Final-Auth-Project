'use strict';

const express = require("express");
const bcrypt =  require("bcrypt");
const { Users } = require("../models/index");
const router = express.Router();


router.post("/signup",async (req,res)=>{
  let { username, password, role } = req.body;
  try {
    let hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await Users.dataCreate({
      username: username,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(403).json(`${error} signup function`);
  }
})

module.exports = router;