const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O usuário precisa de um nome']
  },
  email: {
    type: String,
    required: [true, 'O usuário precisa de um e-mail'],
    trim: true,
    unique: [true, 'O e-mail precisa ser único'],
    validate: [validator.isEmail, 'E-mail inválido']
  },
  birthDate: {
    type: Date,
    required: [true, 'O usuário precisa de uma data de nascimento'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'O usuário precisa de uma senha']
  },
  cart: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
      required: true
    }],
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  likedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }]
});

module.exports = mongoose.model('User', userSchema);