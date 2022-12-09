const path = require('path');
const HttpError = require(path.join(__dirname, '..', 'utils', 'utils.js')).HttpError;
const Seller = require(path.join(__dirname, '..', 'models', 'seller.js'));


const isSeller = (req, res, next) => {
  const { imgDetails } = req.body;
  let parsedImgDetails = JSON.parse(imgDetails);

  const user_id = parsedImgDetails.user_id;

  try {
    Seller.findOne({ user_id }, (err, seller) => {
      if (err) {
        console.log(err);
        throw new HttpError('Unable to find seller', 500);
      }
      if (!seller) {
        res.status(401).json({ message: 'You are not registered as a seller' });
      }
      next();
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = isSeller;