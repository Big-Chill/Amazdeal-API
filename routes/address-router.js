const express = require('express');
const AddressController = require('../controllers/AddressController.js');
const checkAuth = require('../middlewares/check-auth.js');

const router = express.Router();

router.use(checkAuth);

router.get('/get-all-addresses/:id', AddressController.index);
router.post('/create-address', AddressController.createAddress);
router.get('/get-address/:id', AddressController.getAddress);
router.put('/update-address/:id', AddressController.updateAddress);
router.delete('/delete-address/:id', AddressController.deleteAddress);

module.exports = router;

