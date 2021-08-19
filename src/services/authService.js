const jwt = require('jsonwebtoken');

exports.generateToken = async data => {
  return await jwt.sign(data, 'secret', { expiresIn: '365d' });
};

exports.decodeToken = async token => {
  var decodedToken = jwt.verify(token, 'secret');
  return decodedToken;
};

exports.authorize = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).send('access-denied');
  } else {
    jwt.verify(token, 'secret', function(error, decoded) {
      if (error) {
        res.status(401).send('invalid-token');
      } else {
        next();
      }
    });
  }
};