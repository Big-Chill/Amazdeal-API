const express = require('express');
const ImageController = require('../controllers/ImageController.js');
const checkAuth = require('../middlewares/check-auth.js');
const isSeller = require('../middlewares/check-seller.js');
const router = express.Router();


router.get('/products', ImageController.getProducts);
router.get('/search', ImageController.searchProducts);

router.use(checkAuth);
router.use(isSeller);
router.post('/upload', ImageController.uploadImage, ImageController.saveDetails);


module.exports = router;