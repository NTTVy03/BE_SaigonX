isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

const authMiddleware = {
  isAuthenticated: isAuthenticated,
}

module.exports = authMiddleware;