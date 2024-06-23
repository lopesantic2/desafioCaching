const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateFields } = require('../middlewares/validateFields');
const { cacheMiddleware, invalidateCache } = require('../middlewares/cacheMiddleware');
const { getAll, getById, create, update, remove } = require('../controllers/clientesController');

// Middleware para verificar o token
router.use(verifyToken);

// Definindo as rotas com os respectivos controladores e middlewares
router.get('/', cacheMiddleware, getAll);
router.get('/:id', cacheMiddleware, getById);
router.post('/', validateFields, invalidateCache, create);
router.put('/:id', validateFields, invalidateCache, update);
router.delete('/:id', invalidateCache, remove);

module.exports = router;
