const bcrypt = require('bcrypt');
const config = require('../config');

exports.createHash = async plainTextPassword => {
  try {
    const hash = await bcrypt.hash(plainTextPassword, config.saltRounds);
    return hash;
  } catch(error) {
    return error;
  }
};

exports.compareHash = async (plainTextPassword, dbPassword) => {
  try {
    const isAuthenticated = await bcrypt.compare(plainTextPassword, dbPassword);
    return isAuthenticated;
  } catch(error) {
    return error;
  }
};

