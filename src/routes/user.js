'use strict';

const express = require("express");
const bcrypt =  require("bcrypt");
const { Users } = require("../models/index");
const bearerMid = require("../middleware/bearer");
const router = express.Router();


router.get("/user", bearerMid, (req, res)=>{
    res.status(200).json(req.user);
  });

module.exports = router;