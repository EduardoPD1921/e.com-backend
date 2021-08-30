const mongoose = require('mongoose');
const User = mongoose.model('User');
const hashService = require('../services/hashService');
const authService = require('../services/authService');

exports.store = async (req, res, next) => {
  const errors = [];

  try {
    if (req.body.password.length < 8) {
      errors.push({ code: 1000, message: 'Senha muito curta' });
    };

    const emailAlreadyInUse = await User.exists({ email: req.body.email });
    if (emailAlreadyInUse) {
      errors.push({ code: 2000, message: 'E-mail já cadastrado' });
    };

    if (errors.length > 0) {
      return res.status(400).send(errors);
    };

    const hashedPassword = await hashService.createHash(req.body.password);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      birthDate: req.body.birthDate,
      password: hashedPassword
    });

    res.status(200).send({ code: 'user-created' });
  } catch(error) {
    res.status(400).send(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const users = await User.find({}, '_id name email birthDate');
    res.status(200).send(users);
  } catch(error) {
    res.status(500).send(error);
  };
};

exports.login = async (req, res, next) => {
  try {
    const userExists = await User.exists({ email: req.body.email });
    if (userExists === false) {
      return res.status(400).send({ code: 'wrong-email' });
    };

    const authUser = await User.find({ email: req.body.email });
    const correctCredential = await hashService.compareHash(req.body.password, authUser.password);

    res.status(200).send(correctCredential);
  } catch(error) {
    res.status(500).send(error);
  };
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.findOneAndDelete({ _id: id });
    res.status(200).send({ code: 'user-deleted' });
  } catch(error) {
    res.status(500).send(error);
  }
};