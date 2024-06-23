const clientesService = require('../services/clientesService');

const getAll = async (req, res) => {
    try {
        const clientes = await clientesService.getAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const cliente = await clientesService.getById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newCliente = await clientesService.create(req.body);
        res.status(201).json(newCliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedCliente = await clientesService.update(req.params.id, req.body);
        if (!updatedCliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente atualizado com sucesso', cliente: updatedCliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await clientesService.remove(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
