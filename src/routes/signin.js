'use strict';

const express = require("express");
const bcrypt =  require("bcrypt");
const { Users } = require("../models/index");
const router = express.Router();
const basicMid = require("../middleware/basic");


router.post("/signin", basicMid, (req, res)=>{
    res.status(200).json(req.user);
  } );

  module.exports = router;