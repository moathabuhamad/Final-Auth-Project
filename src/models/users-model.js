"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

  Users.authenticateBasic = async function (username,password) {
    try {
        const user = await this.findOne({where:{username:username}});
        const valid = await bcrypt.compare(password,user.password);
        if(valid) {
            // generate a new token
            let newToken = jwt.sign({exp:Math.floor(Date.now()/1000)+900,username:user.username},SECRET);
            user.token = newToken;
            return user;
        } else {

            throw new Error('Invalid password');
        }
    } catch(error) {
       throw new Error(`error ,${error}`);
    }
  }

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
