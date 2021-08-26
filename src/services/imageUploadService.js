const config = require('../config');
const FormData = require('form-data');
const axios = require('axios');

exports.uploadImage = async imageBuffer => {
  const encode_img = imageBuffer.toString("base64");

  var data = new FormData();
  data.append('image', encode_img);

  var requestConfig = {
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
      'Authorization': `Client-ID ${config.imgurClientID}`,
      ...data.getHeaders()
    },
    data
  };

  try {
    var requestResp = await axios(requestConfig);
    return requestResp.data.data.link;
  } catch(error) {
    return error
  };
};