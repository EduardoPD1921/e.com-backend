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
    trim: true,
    lowercase: true,
    required: [true, 'O produto precisa de uma tag']
  }],
  image: {
    type: String,
    required: [true, 'O produto precisa de uma imagem']
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);