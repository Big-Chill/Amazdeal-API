const app = require('express')();
const path = require('path');
const fs = require('fs');
const People = require(path.join(__dirname, '..', 'models', 'people.js'));


const index = (req, res) => {
  People.find({}, (err, people) => {
    if (err) {
      console.log(err);
    }
    res.json({ data: people });
  });
}

const show = (req, res) => {

  const { id } = req.params;
  People.findById(id, (err, person) => {
    if (err) {
      console.log(err);
    }
    res.json(person);
  });
};

const create = (req, res) => {
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
  const { id } = req.params;
  People.findByIdAndDelete(id, (err, person) => {
    if (err) {
      console.log(err);
    }
    res.json(person);
  });
};

const upload = (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  }
  catch (err) {
    res.status(500).json({ message: 'Error uploading file', error: err });
  }
};

module.exports = {
  index,
  create,
  update,
  destroy,
  show,
  upload
};