const { body, validationResult } = require('express-validator');

const validateFields = [
  body('nome').isLength({ min: 3, max: 255 }).withMessage('Nome deve ter entre 3 e 255 caracteres'),
  body('sobrenome').isLength({ min: 3, max: 255 }).withMessage('Sobrenome deve ter entre 3 e 255 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('idade').isInt({ min: 0, max: 119 }).withMessage('Idade deve ser um número positivo e menor que 120'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateFields
};
