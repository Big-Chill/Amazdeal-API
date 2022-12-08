const path = require('path');
const jwt = require('jsonwebtoken');
const People = require(path.join(__dirname, '..', 'models', 'people.js'));


const index = (req, res) => {

  const { authorization } = req.headers;

  token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'devils_breath_secret');
  } catch (error) {
    return res.status(401).json({ message: 'Something went wrong' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  People.find({}, (err, people) => {
    if (err) {
      console.log(err);
    }
    res.json({ data: people });
  });
}

const show = (req, res) => {
  const { authorization } = req.headers;

  token = authorization.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'devils_breath_secret');
  } catch (error) {
    return res.status(401).json({ message: 'Something went wrong' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  const { id } = req.params;
  People.findById(id, (err, person) => {
    if (err) {
      console.log(err);
    }
    res.json(person);
  });
};

const create = (req, res) => {
  const { authorization } = req.headers;

  token = authorization.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'devils_breath_secret');
  } catch (error) {
    return res.status(401).json({ message: 'Something went wrong' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { firstName, lastName, age } = req.body;

  const newPerson = new People({ firstName, lastName, age });
  newPerson.save((err, person) => {
    if (err) {
      console.log(err);
    }
    res.json(person);
  });
};

const update = (req, res) => {
  const { authorization } = req.headers;
  token = authorization.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'devils_breath_secret');
  } catch (error) {
    return res.status(401).json({ message: 'Something went wrong' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  People.findByIdAndUpdate(id, { firstName, lastName, age }, { new: true }, (err, person) => {
    if (err) {
      console.log(err);
    }
    res.json(person);
  });
};

const destroy = (req, res) => {
  const { authorization } = req.headers;
  token = authorization.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'devils_breath_secret');
  } catch (error) {
    return res.status(401).json({ message: 'Something went wrong' });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  const { id } = req.params;
  People.findByIdAndDelete(id, (err, person) => {
    if (err) {
      console.log(err);
    }
    res.json(person);
  });
};

module.exports = {
  index,
  create,
  update,
  destroy,
  show
};