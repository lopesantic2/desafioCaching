require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');
const produtosController = require('./controllers/produtosController');
const cache = new NodeCache();

const app = express();

// Middleware para parsing de JSON
app.use(bodyParser.json());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Middleware de caching
function cacheMiddleware(req, res, next) {
    const chaveCache = 'produtos';
    const produtosCache = cache.get(chaveCache);

    if (produtosCache) {
        console.log('Produtos recuperados do cache');
        return res.json(produtosCache);
    } else {
        next();
    }
}

// Rota para buscar todos os produtos com middleware de caching
app.get('/produtos', cacheMiddleware, async (req, res) => {
    try {
        const produtos = await produtosController.getAllProdutos();
        cache.set('produtos', produtos, 300); // Cache por 5 minutos
        res.json(produtos);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

// Rota para adicionar um novo produto
app.post('/produtos', async (req, res) => {
    const { nome, descricao, preco, data_atualizado } = req.body;
    try {
        const novoProduto = await produtosController.createProduto(nome, descricao, preco, data_atualizado);
        cache.del('produtos');
        console.log('Novo produto adicionado:', novoProduto);
        res.json({ message: 'Novo produto adicionado com sucesso', produto: novoProduto });
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
});

// Rota para atualizar um produto
app.put('/produtos/:id', async (req, res) => {
    const idProduto = parseInt(req.params.id);
    const { nome, descricao, preco, data_atualizado } = req.body;
    try {
        const produtoAtualizado = await produtosController.updateProduto(idProduto, nome, descricao, preco, data_atualizado);
        if (produtoAtualizado) {
            cache.del('produtos');
            console.log('Produto atualizado:', produtoAtualizado);
            res.json({ message: 'Produto atualizado com sucesso', produto: produtoAtualizado });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

// Rota para remover um produto
app.delete('/produtos/:id', async (req, res) => {
    const idProduto = parseInt(req.params.id);
    try {
        const produtoRemovido = await produtosController.deleteProduto(idProduto);
        if (produtoRemovido) {
            cache.del('produtos');
            console.log('Produto removido:', idProduto);
            res.json({ message: 'Produto removido com sucesso' });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao remover produto:', err);
        res.status(500).json({ error: 'Erro ao remover produto' });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
