// Require all the middlewares here

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3001;
const passport = require('passport');
const session = require('express-session');
const db = require(path.join(__dirname, '..', 'config', 'mongoose.js'));



// Set up the view engine

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set up the session management

const expressSession = session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
});

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());


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