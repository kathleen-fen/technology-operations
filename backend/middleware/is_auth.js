import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
  //get token from request header
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).send("Token is not provided!");
  const token = authHeader.split(" ")[1];
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  if (token == null) res.sendStatus(400).send("Token not present");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      req.user = user;
      next(); //proceed to the next action in the calling function
    }
  }); //end of jwt.verify()
}; //end of function
