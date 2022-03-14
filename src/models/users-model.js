"use strict";

const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET;

const UsersModel = (sequelize, DataTypes) => {
  const Users = sequelize.define("student", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("teacher", "student"),
      defaultValue: "student",
    },

    token: {
        type: DataTypes.VIRTUAL
    },

    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          student: ["read"],
          teacher: ["read", "create", "update", "delete"],
        };
        return acl[this.role];
      },
    },
  });



  Users.validateToken = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);

    const student = await this.findOne({
      where: { username: parsedToken.username },
    });
    if (student) {
      return student;
    } else {
      throw new Error("invalid token");
    }
  };

  return Users;
};
module.exports = UsersModel;
