const express = require('express');
const PeopleController = require('../controllers/PeopleController.js');
const checkAuth = require('../middlewares/check-auth.js');
const fileUpload = require('../middlewares/file-upload.js');

const router = express.Router();

router.use(checkAuth);

router.get('/all', PeopleController.index);
router.get('/individual/:id', PeopleController.show);
router.post('/new', PeopleController.create);
router.put('/update/:id', PeopleController.update);
router.delete('/delete/:id', PeopleController.destroy);
router.post('/upload', fileUpload.single('image'), PeopleController.upload);

module.exports = router;