const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAccount = require('../models').UserAccount;
const { UserUsecase } = require('../usecase/user');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  console.log("# Register API");

  const { username, password, email, fullName} = req.body;

  let hashedPassword = password;
  // const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = { 
      username, 
      password: hashedPassword, 
      email, 
      fullName: (fullName ? fullName : username)
    };

    let userAccount = await UserAccount.create(user);
    userAccount = userAccount.dataValues;
    delete userAccount.password;

    res.status(201).json({
      message: "Register success",
      data: userAccount
    });
  } catch (error) {
    console.log(">>>> error: ", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  console.log("# Login API");
  const { username, password } = req.body;
  console.log("username: ", username);
  console.log("password: ", password)
  try {
    const user = await UserAccount.findOne({ where: { username } });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).json({ error: 'Invalid username or password' });
    // }
    if (!user || !(password === user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }


    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
    const userDetail = await UserUsecase.getUserInfo(user.id);

    res.json({ 
      message: 'Login successful',
      data: {
        accessToken,
        user: userDetail
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  console.log("# Logout API");
  // Since we're not using refresh tokens or sessions, 
  // logout is handled on the client side by removing the token
  res.json({ message: 'Logout successful' });
};
