const express = require('express');
const ImageController = require('../controllers/ImageController.js');
const checkAuth = require('../middlewares/check-auth.js');
const router = express.Router();

router.use(checkAuth);

router.post('/upload', ImageController.uploadImage, ImageController.saveDetails);

module.exports = router;