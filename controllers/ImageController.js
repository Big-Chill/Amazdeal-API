const path = require('path');
const HttpError = require(path.join(__dirname, '..', 'utils', 'utils.js')).HttpError;
const fileUpload = require(path.join(__dirname, '..', 'middlewares', 'file-upload.js'));
const ProductImages = require(path.join(__dirname, '..', 'models', 'product-images.js'));

const saveDetails = (req, res) => {
  const { imgDetails } = req.body;
  let parsedImgDetails = JSON.parse(imgDetails);
  parsedImgDetails = { ...parsedImgDetails, filePath: req.body.imgUrl };


  const newProduct = new ProductImages(parsedImgDetails);

  try {
    newProduct.save((err, product) => {
      if (err) {
        console.log(err);
        throw new HttpError('Unable to save product', 500);
      }
      res.status(201).json({ message: 'Product saved successfully', data: product });
    });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const uploadImage = async (req, res, next) => {
  try {
    const myFile = req.file;
    const imgUrl = await fileUpload(myFile);
    req.body.imgUrl = imgUrl;
    next();
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};



module.exports = { uploadImage, saveDetails };