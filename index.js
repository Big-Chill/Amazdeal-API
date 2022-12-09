const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const db = require(path.join(__dirname, 'config', 'mongoose.js'));
const PeopleRouter = require(path.join(__dirname, 'routes', 'people-router.js'));
const UserRouter = require(path.join(__dirname, 'routes', 'user-router.js'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  exposedHeaders: ['x-auth-token', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));

app.use('/user', UserRouter);
app.use('/', PeopleRouter);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

