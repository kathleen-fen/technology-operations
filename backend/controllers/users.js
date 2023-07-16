//const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

import { Users } from "./../models/Users.js";

export const createUser = async (req, res, _next) => {
  try {
    const user = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await Users.create({
      username: user,
      password: hashedPassword,
    });
    const { password, ...userToSend } = newUser.dataValues;
    res.status(201).send(userToSend);
  } catch (err) {
    console.log(err);
  }
};
