const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require(path.join(__dirname, '..', 'models', 'user.js'));
const HttpError = require(path.join(__dirname, '..', 'utils', 'utils.js')).HttpError;

const signup =  async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  }
  catch (error) {
    const errorMsg = new HttpError('Signing up failed, please try again later.', 500);
    return next(errorMsg);
  }

  if (existingUser) {
    const errorMsg = new HttpError('User exists already, please login instead.', 404);
    return res.status(404).json({ message: errorMsg.message });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const errorMsg = new HttpError('Could not create user, please try again.', 500);
    return next(errorMsg);
  }

  let token;
  try {
    token = jwt.sign({ email: email, password: hashedPassword }, 'devils_breath_secret');
  } catch (error) {
    const errorMsg = new HttpError('Signing up failed, please try again later.', 500);
    return next(errorMsg);
  }

  const newUser = await new User({ email: email, password: hashedPassword, token: token, isSeller: false });

  try {
    newUser.save();
  } catch (error) {
    const errorMsg = new HttpError('Signing up failed, please try again later.', 500);
    res.status(500).json({ message: errorMsg.message });
  }

  return res.status(201).json({ user: newUser.toObject({ getters: true }), token: token });
};


const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (error) {
    const errorMsg = new HttpError('Logging in failed, please try again later.', 500);
    return next(errorMsg);
  };

  if (!existingUser) {
    const errorMsg = new HttpError('User does not exist, please signup instead.', 404);
    return res.status(401).json({ message: errorMsg.message });
  };

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const errorMsg = new HttpError('Server error, please try again later.', 500);
    return next(errorMsg);
  };

  if (!isValidPassword) {
    const errorMsg = new HttpError('Wrong password, please try again.', 401);
    return res.status(401).json({ message: errorMsg.message });
  };

  return res.status(200).json({ message: 'Logged in!', user: existingUser.toObject({ getters: true }), token: existingUser.token });
};


const updateUserInfo = (req, res) => {
  const { email, isSeller } = req.body;

  User.findOneAndUpdate({ email: email }, { isSeller: true }, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Server error, please try again later.' });
    } else {
      return res.status(200).json({ message: 'User updated!', user: user.toObject({ getters: true }) });
    }
  });
};


module.exports = { signup, login, updateUserInfo };


