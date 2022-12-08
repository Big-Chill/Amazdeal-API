const { PeopleRouter, app, port } = require('../middlewares/index.js');
const PeopleController = require('../controllers/PeopleController.js');




PeopleRouter
  .get('/all', PeopleController.index)
  .get('/individual/:id', PeopleController.getOne)
  .post('/new', PeopleController.create)
  .put('/update/:id', PeopleController.update)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));