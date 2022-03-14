"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Collection = require('./collection');
require("dotenv").config();
const Users = require("./users-model");
const HomeWorks = require('./homeworks');

const SECRET = process.env.SECRET;

const DATABASE_URL =
  process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

let user = Users(sequelize, DataTypes);
let userCollect = new Collection(user);
let HomeW = HomeWorks(sequelize, DataTypes);
let homeWCollect = new Collection(HomeW);

module.exports = {
  db: sequelize,
  Users: userCollect,
  Usermodel:user,
  HomeW:HomeW,
  homeWCollect:homeWCollect
};
