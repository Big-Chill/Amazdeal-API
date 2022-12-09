const random_generator = require('random-string-alphanumeric-generator');
const { randomAlphanumeric } = random_generator;

const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const tokenGenerator = () => {
  const token_length = 20;
  return randomAlphanumeric(token_length);
}

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}



module.exports = { isValidEmail, tokenGenerator, HttpError };