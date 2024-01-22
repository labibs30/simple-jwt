const jwt = require("jsonwebtoken");
const db = require("./db");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return req.send(401);
  }

  const data = jwt.verify(authHeader, "footbar");
  const user = db.Users.getUser(data.id);

  if (!user) {
    return res.send(401);
  }
  console.log(data);
  req.user = user;
  next();
};
