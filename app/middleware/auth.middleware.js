require('dotenv').config();
const {UserUsecase} = require('../usecase/user')
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

const isAdmin = async (req, res, next) => {
  let userId = req.userId;
  let userInfo = await UserUsecase.getUserInfo(userId);
  let isAdmin = userInfo.roles.some(role => role.role === 'admin' && role.isActive);
  console.log("isAdmin: userInfo --> ", isAdmin);
  if (isAdmin) {
    next();
    return;
  }
  
  res.status(403).send("Require Admin Role!");
}

const authJwt = {
  authenticateJWT,
  isAdmin
}

module.exports = authJwt;