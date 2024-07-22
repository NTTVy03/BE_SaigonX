require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, userObject) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }
      console.log("authenticateJWT: userId --> ", userObject);
      req.userId = userObject.id;
      req.user = userObject;
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