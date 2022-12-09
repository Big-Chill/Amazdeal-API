const multer = require('multer');
const uuid = require('uuid').v1;
const path = require('path');
const gc = require('../config/google-cloud');
const bucket = gc.bucket('amazdeal_product_images');


const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname.replace(/ /g, "_"));
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    resolve(publicUrl);
  }).on('error', () => {
    reject(`Unable to upload image, something went wrong`);
  }).end(buffer);
});

module.exports = uploadImage;