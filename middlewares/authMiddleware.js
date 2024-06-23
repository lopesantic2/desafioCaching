// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('Token recebido:', token);
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Erro ao verificar token:', err);
      return res.status(401).send('Failed to authenticate token');
    }
    req.userId = decoded.id;
    next();
  });
};
