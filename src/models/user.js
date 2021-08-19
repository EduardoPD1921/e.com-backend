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
  }
});

module.exports = mongoose.model('User', userSchema);