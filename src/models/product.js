const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O produto precisa de um título']
  },
  description: {
    type: String,
    required: [true, 'O produto precisa de uma descrição']
  },
  price: {
    type: Number,
    required: [true, 'O produto precisa de um preço']
  },
  tags: [{
    type: String,
    required: [true, 'O produto precisa de uma tag']
  }],
  image: {
    type: String,
    required: [true, 'O produto precisa de uma imagem']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);