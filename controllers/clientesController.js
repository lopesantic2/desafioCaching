const clientesService = require('../services/clientesService');

exports.getAll = async (req, res) => {
    try {
        const clientes = await clientesService.getAll();
        res.json(clientes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter clientes' });
    }
};

exports.getById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cliente = await clientesService.getById(id);
        res.json(cliente);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter cliente' });
    }
};

exports.create = async (req, res) => {
    const { nome, sobrenome, email, idade } = req.body;
    try {
        await clientesService.create(nome, sobrenome, email, idade);
        res.send('Cliente criado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
};

exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, sobrenome, email, idade } = req.body;
    try {
        await clientesService.update(id, nome, sobrenome, email, idade);
        res.send('Cliente atualizado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

exports.remove = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await clientesService.remove(id);
        res.send('Cliente removido com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao remover cliente' });
    }
};
