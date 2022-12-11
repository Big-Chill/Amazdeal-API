const express = require('express');
const OrderController = require('../controllers/OrderController.js');
const checkAuth = require('../middlewares/check-auth.js');
const router = express.Router();

router.use(checkAuth);

router.post('/save', OrderController.saveOrder);
router.get('/get/:user_id', OrderController.getOrder);
router.get('/search', OrderController.searchOrder);

module.exports = router;