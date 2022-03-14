"use strict";

const HomeWorks = (sequelize, DataTypes) =>
  sequelize.define("homeworks", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING,
    },
    grade: {
        type: DataTypes.DOUBLE,
      }
  });

module.exports = HomeWorks;