require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, userId) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }
      req.userId = userId;
      console.log("authenticateJWT --> passed")
      console.log(req.userId)
      next();
    });
  } else {
    console.log("authenticateJWT --> no token")
    res.sendStatus(401);
  }
};

const authJwt = {
  authenticateJWT,
}

module.exports = authJwt;