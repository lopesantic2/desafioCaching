const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateFields } = require('../middlewares/validateFields');
const { getAll, getById, create, update, remove } = require('../controllers/clientesController');

router.use(verifyToken); // Aplica o middleware para todas as rotas

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', validateFields, create);
router.put('/:id', validateFields, update);
router.delete('/:id', remove);

module.exports = router;
