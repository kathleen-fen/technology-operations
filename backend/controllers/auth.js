import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Users } from "./../models/Users.js";

export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        username: req.body.username,
      },
    });
    //check to see if the user exists in the list of registered users
    if (user == null) res.status(404).send("User does not exist!");
    //if user does not exist, send a 400 response
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({ user: req.body.username });
      const refreshToken = generateRefreshToken({ user: req.body.username });
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(401).send("Password Incorrect!");
    }
  } catch (err) {
    console.log(err);
  }
};
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}
