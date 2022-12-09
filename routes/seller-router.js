const express = require('express');
const SellerController = require('../controllers/SellerController.js');
const checkAuth = require('../middlewares/check-auth.js');
const router = express.Router();

router.use(checkAuth);

router.post('/create-seller', SellerController.createSeller);
router.get('/get-seller/:id', SellerController.getSeller);
router.put('/update-seller/:id', SellerController.updateSeller);

module.exports = router;