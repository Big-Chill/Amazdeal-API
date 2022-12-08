const { PeopleRouter, app, port, UserRouter } = require('../middlewares/index.js');
const PeopleController = require('../controllers/PeopleController.js');
const UserController = require('../controllers/UserController.js');


PeopleRouter
  .get('/all', PeopleController.index)
  .get('/individual/:id', PeopleController.show)
  .post('/new', PeopleController.create)
  .put('/update/:id', PeopleController.update)

UserRouter
  .post('/signup', UserController.signup)

app.listen(port, () => console.log(`App running on port ${port}!`));