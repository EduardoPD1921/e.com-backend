const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const imageUploadService = require('../services/imageUploadService');

exports.store = async (req, res, next) => {
  // Image uploader considering that imgur api it's never gonna failed
  const imageLink = await imageUploadService.uploadImage(req.file.buffer);

  try {
    await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      tags: req.body.tags.split(','),
      image: imageLink
    });

    res.status(200).send({ code: 'product-registered' });
  } catch(error) {
    res.status(400).send(error);
  };
};

exports.show = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch(error) {
    res.status(500).send(error);
  };
};