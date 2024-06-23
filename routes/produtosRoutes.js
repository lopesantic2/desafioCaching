const express = require('express');
const router = express.Router();
const { validateFields } = require('../middlewares/validateFields');
const { getAll, getById, create, update, remove } = require('../controllers/produtosController');

// Definindo as rotas com os respectivos controladores e middlewares
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validateFields, create);
router.put('/:id', validateFields, update);
router.delete('/:id', remove);

module.exports = router;
