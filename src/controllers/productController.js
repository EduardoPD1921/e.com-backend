const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const imageUploadService = require('../services/imageUploadService');

exports.store = async (req, res, _next) => {
  try {
    const imageLink = await imageUploadService.uploadImage(req.file.buffer);

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

exports.show = async (_req, res, _next) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch(error) {
    res.status(500).send(error);
  };
};

exports.getProductById = async (req, res, _next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    res.status(200).send(product);
  } catch(error) {
    // Temporary res state
    res.status(500).send(error);
  };
};

exports.getLastAdded = async (_req, res, _next) => {
  try {
    const lastProducts = await Product.find({})
    .sort({ createdAt: 'desc' })
    .limit(10);

    res.status(200).send(lastProducts);
  } catch(error) {
    res.status(500).send(error);
  };
};