const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const axios = require('axios');
const FormData = require('form-data');
const config = require('../config');

exports.store = async (req, res, next) => {
  var data = new FormData();
  data.append('image', req.body.image);

  var requestConfig = {
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
      'Authorization': `Client-ID ${config.imgurClientID}`
    },
  };

  try {
    var reqResp = await axios(data, requestConfig);
    res.send(reqResp);
  } catch(error) {
    res.status(400).send(error);
  }
};