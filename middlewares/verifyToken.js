const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Cabeçalho de autorização é necessário');

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).send('Formato de autorização inválido. Formato esperado: Bearer <token>');
  }

  const token = parts[1];
  if (!token) return res.status(401).send('Token é necessário');

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).send('Segredo JWT não definido');

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(`Falha ao autenticar token: ${err.message}`);
    }
    req.userId = decoded.id;
    next();
  });
};
