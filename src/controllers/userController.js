const mongoose = require('mongoose');
const User = mongoose.model('User');
const hashService = require('../services/hashService');

exports.store = async (req, res, next) => {
  try {
    const hashedPassword = await hashService.createHash(req.body.password);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      birthDate: req.body.birthDate,
      password: hashedPassword
    });

    res.status(200).send('user-created');
  } catch(error) {
    res.status(400).send(error);
  }
};