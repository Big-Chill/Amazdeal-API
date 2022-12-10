const path = require('path');
const Seller = require(path.join(__dirname, '..', 'models', 'seller.js'));
const HttpError = require(path.join(__dirname, '..', 'utils', 'utils.js')).HttpError;

const createSeller = async (req, res, next) => {
  const { firstName, lastName, email, shopAddress, shopName, user_id } = req.body;

  const details = { firstName, lastName, email, shopAddress, shopName, user_id }

  const newSeller = await new Seller(details);

  try {
    newSeller.save((err, seller) => {
      if (err) {
        throw new HttpError("Error in creating seller", 400);
      }
      req.isSeller = true;
      next();
    })
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};


const getSeller = (req, res) => {
  const { id } = req.params;

  try {
    Seller.findById(id, (err, seller) => {
      if (err) {
        throw new HttpError("Error in getting seller", 400);
      }
      res.status(200).json({message: 'Seller fetched successfully', seller: seller});
    });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};


const updateSeller = (req, res) => {
  const { id } = req.params;
  const { firstName, middleName, lastName, email, shopAddress, shopName, user_id } = req.body;

  try {
    Seller.findByIdAndUpdate(id, { firstName, middleName, lastName, email, shopAddress, shopName, user_id }, { new: true }, (err, seller) => {
      if (err) {
        throw new HttpError("Error in updating seller", 400);
      }
      res.status(200).json({message: 'Seller updated successfully', seller: seller});
    });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

module.exports = { createSeller, getSeller, updateSeller };