const jwt = require("jsonwebtoken");
require("dotenv").config()

const authRouter = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.secret_key);
    if (decoded) {
      const userID = decoded.userID;
      req.body.userID = userID;
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
};

module.exports = {
  authRouter,
};
