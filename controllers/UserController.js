const path = require('path');
const bcrypt = require('bcrypt');
const User = require(path.join(__dirname, '..', 'models', 'user.js'));
const HttpError = require(path.join(__dirname, '..', 'models', 'http-error.js'));

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

  const newUser = await new User({ email: email, password: hashedPassword });

  try {
    newUser.save();
  } catch (error) {
    const errorMsg = new HttpError('Signing up failed, please try again later.', 500);
    res.status(500).json({ message: errorMsg.message });
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

module.exports = { signup }


