const jwt = require('jsonwebtoken');
const HttpError = require('../utils/utils.js').HttpError;

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error();
    }
    const decodedToken = jwt.verify(token, 'devils_breath_secret');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    const errorMsg = new HttpError('Authentication failed', 401);
    return res.status(401).json({ message: errorMsg.message });
  }
};

module.exports = checkAuth;