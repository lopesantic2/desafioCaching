const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Authorization header is required');

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).send('Invalid authorization format. Expected format: Bearer <token>');
  }

  const token = parts[1];
  if (!token) return res.status(401).send('Token is required');

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).send('JWT secret is not defined');

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(`Failed to authenticate token: ${err.message}`);
    }
    req.userId = decoded.id;
    next();
  });
};
