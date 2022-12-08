// Require all the middlewares here

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const db = require(path.join(__dirname, '..', 'config', 'mongoose.js'));



// Using the middlewares
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Set up CORS
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  exposedHeaders: ['x-auth-token', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));



// Set up the routes
const PeopleRouter = express.Router();
app.use('/', PeopleRouter);

const UserRouter = express.Router();
app.use('/user', UserRouter);

module.exports = { PeopleRouter, UserRouter, app, port };