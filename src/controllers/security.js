const jwt = require('jsonwebtoken');
const config = require('../configs/config')

function verifyUser(req, res, next) {
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
        return res.json({ message: 'Invalid token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: 'Token no proveída.'
    });
  };
}

module.exports = { verifyUser }