const produtosService = require('../services/produtosService');

exports.getAll = async (req, res) => {
  try {
    const produtos = await produtosService.getAll();
    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }
    res.json(produtos);
  } catch (err) {
    console.error('Erro ao obter produtos:', err);
    res.status(500).json({ error: 'Algo deu errado!' });
  }
};

exports.getById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const produto = await produtosService.getById(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res) => {
  const { nome, descricao, preco, data_atualizado } = req.body;
  try {
    const novoProduto = await produtosService.create(nome, descricao, preco, data_atualizado);
    res.status(201).json(novoProduto);
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

exports.update = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const { nome, descricao, preco, data_atualizado } = req.body;
  try {
    const atualizado = await produtosService.update(id, nome, descricao, preco, data_atualizado);
    if (!atualizado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const removido = await produtosService.remove(id);
    if (!removido) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    next(err);
  }
};
