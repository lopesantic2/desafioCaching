// produtosRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateFields } = require('../middlewares/validateFields');
const { getAllProdutos, getProdutoById, createProduto, updateProduto, deleteProduto } = require('../controllers/produtosController');

router.use(authMiddleware);

router.get('/', getAllProdutos);
router.get('/:id', getProdutoById);
router.post('/', validateFields, createProduto);
router.put('/:id', validateFields, updateProduto);
router.delete('/:id', deleteProduto);

module.exports = router;
