const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const axios = require('axios');
const FormData = require('form-data');
const config = require('../config');

exports.store = async (req, res, next) => {
  console.log(req.body.text);
  const encode_img = req.file.buffer.toString("base64");

  var data = new FormData();
  data.append('image', encode_img);

  var requestConfig = {
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
      'Authorization': `Client-ID ${config.imgurClientID}`,
      ...data.getHeaders()
    },
    data: data
  };

  try {
    var requestResp = await axios(requestConfig);
    console.log(requestResp);
  } catch(error) {
    console.log(error);
  };
};