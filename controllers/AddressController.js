const path = require('path');
const HttpError = require(path.join(__dirname, '..', 'utils', 'utils.js')).HttpError;
const Address = require('../models/address');

const index = (req, res) => {
  const { id } = req.params;

  try {
    Address.find({ user_id: id }, (err, addresses) => {
      if (err) {
        throw new HttpError("Error in getting addresses", 400);
      }
      res.status(200).json({ message: 'Addresses fetched successfully', addresses: addresses });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createAddress = async (req, res) => {
  const { country, fullName, mobileNumber, pincode, address_line_1, address_line_2, landmark, city, state, is_default_address, address_type, user_id } = req.body;

  const newAddress = await new Address({ country, fullName, mobileNumber, pincode, address_line_1, address_line_2, landmark, city, state, is_default_address, address_type, user_id });

  try {
    newAddress.save((err, address) => {
      if (err) {
        throw new HttpError("Error in creating address", 400);
      }
      res.status(201).json({ message: 'Address created successfully', address: address });
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAddress = (req, res) => {
  const { id } = req.params;

  try {
    Address.findById(id, (err, address) => {
      if (err) {
        throw new HttpError("Error in getting address", 400);
      }
      res.status(200).json({ message: 'Address fetched successfully', address: address });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateAddress = (req, res) => {
  const { id } = req.params;
  const { country, fullName, mobileNumber, pincode, address_line_1, address_line_2, landmark, city, state, is_default_address, address_type, user_id } = req.body;

  try {
    Address.findByIdAndUpdate(id, { country, fullName, mobileNumber, pincode, address_line_1, address_line_2, landmark, city, state, is_default_address, address_type, user_id }, { new: true }, (err, address) => {
      if (err) {
        throw new HttpError("Error in updating address", 400);
      }
      res.status(200).json({ message: 'Address updated successfully', address: address });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteAddress = (req, res) => {
  const { id } = req.params;

  try {
    Address.findByIdAndDelete(id, (err, address) => {
      if (err) {
        throw new HttpError("Error in deleting address", 400);
      }
      res.status(200).json({ message: 'Address deleted successfully', address: address });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { index, createAddress, getAddress, updateAddress, deleteAddress };