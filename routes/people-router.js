const express = require('express');
const PeopleController = require('../controllers/PeopleController.js');
const checkAuth = require('../middlewares/check-auth.js');

const router = express.Router();

router.use(checkAuth);

router.get('/all', PeopleController.index);
router.get('/individual/:id', PeopleController.show);
router.post('/new', PeopleController.create);
router.put('/update/:id', PeopleController.update);

module.exports = router;