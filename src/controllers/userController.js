const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.store = async (req, res, next) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      birthDate: req.body.birthDate,
      password: req.body.password
    });

    res.status(200).send('user-created');
  } catch(error) {
    res.status(400).send(error);
  }
};