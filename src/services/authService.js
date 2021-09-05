const jwt = require('jsonwebtoken');

exports.generateToken = data => {
  return jwt.sign(data, 'secret', { expiresIn: '365d' });
};

exports.decodeToken = token => {
  var decodedToken = jwt.verify(token, 'secret');
  return decodedToken;
};

exports.authorize = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['authorization'];

  if (!token) {
    res.status(401).send('access-denied');
  } else {
    jwt.verify(token, 'secret', function(error, decoded) {
      if (error) {
        res.status(401).send('invalid-token');
      } else {
        res.locals.token = token;
        next();
      }
    });
  }
};