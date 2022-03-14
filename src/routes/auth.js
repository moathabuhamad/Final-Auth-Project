"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models/index");
const bearerMid = require("../middleware/bearer");
const acl = require("../middleware/acl");
// const mo = require('../models/index');
const {HomeW, homeWCollect} = require('../models/index');

router.param("model", (req, res, next) => {
  if (models[req.params.model]) {
    req.model = models[req.params.model];
    next();
  } else {
    next("model does not exist");
  }
});

router.post("/:model", bearerMid, acl("create"), async (req, res) => {
  let body = req.body;
  let newModels = await req.model.dataCreate(body);
  res.status(201).send(newModels);
});

router.get("/:model", bearerMid, acl("read"), async (req, res) => {
  let { id } = req.params;
  res.status(200).json(await req.model.getData(id));
});

router.get("/:model/:id", bearerMid, acl("read"), async (req, res) => {
  let { id } = req.params;
  res.status(200).json(await req.model.getData(id));
});

router.put("/:model/:id", bearerMid, acl("update"), async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let renewedModels = await req.model.dataUpdate(id, body);
  res.status(200).json(await req.model.getData(id));
});

router.delete("/:model/:id", bearerMid, acl("delete"), async (req, res) => {
  let { id } = req.params;
  await req.model.dataDelete(id);
  res.status(200).send("removed Homework");
});

module.exports = router;
