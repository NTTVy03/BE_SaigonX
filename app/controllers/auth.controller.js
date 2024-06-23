const bcrypt = require('bcryptjs');
const User = require('../models').users;

exports.register = async (req, res) => {
  console.log("# Register API");

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({
      message: "Register success"
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  console.log("# Login API");
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.session.userId = user.id;
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  console.log("# Logout API");
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Failed to logout' });
    res.json({ message: 'Logout successful' });
  });
};
