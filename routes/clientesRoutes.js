// clientesRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateFields } = require('../middlewares/validateFields');
const { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require('../controllers/clientesController');

router.use(authMiddleware);

router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/', validateFields, createCliente);
router.put('/:id', validateFields, updateCliente);
router.delete('/:id', deleteCliente);

module.exports = router;
