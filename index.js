const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const port = 3001;
const db = require(path.join(__dirname, 'config', 'mongoose.js'));
const UserRouter = require(path.join(__dirname, 'routes', 'user-router.js'));
const ImageRouter = require(path.join(__dirname, 'routes', 'image-router.js'));
const SellerRouter = require(path.join(__dirname, 'routes', 'seller-router.js'));
const AddressRouter = require(path.join(__dirname, 'routes', 'address-router.js'));
const OrderRouter = require(path.join(__dirname, 'routes', 'order-router.js'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  exposedHeaders: ['x-auth-token', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  }
});

app.use(multerMid.single('image'));

app.use('/user', UserRouter);
app.use('/image', ImageRouter);
app.use('/seller', SellerRouter);
app.use('/address', AddressRouter);
app.use('/order', OrderRouter);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

