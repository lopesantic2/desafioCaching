require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');
const clientesRoutes = require('./routes/clientesRoutes'); // Certifique-se de que o caminho está correto
const produtosRoutes = require('./routes/produtosRoutes');
const produtosController = require('./controllers/produtosController');
const { verifyToken } = require('./middlewares/authMiddleware');
const cache = new NodeCache();

const app = express();
const port = 3090;

// Middleware para parsing de JSON
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
    res.send('Bem Vindo a minha Aplicação!');
});

// Rota de login para gerar token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        const user = { id: 1, username: 'admin' };
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

// Rota de logout para invalidar token
app.post('/logout', (req, res) => {
    res.json({ message: 'Logout realizado com sucesso' });
});

// Rotas para clientes (com autenticação JWT)
app.use('/clientes', verifyToken, clientesRoutes);

// Rotas para produtos (sem autenticação JWT)
app.use('/produtos', cacheMiddleware, produtosRoutes);

// Rota para buscar todos os produtos com middleware de caching
app.get('/produtos', cacheMiddleware, async (req, res) => {
    try {
        const produtos = await produtosController.getAllProdutos();
        cache.set('produtos', produtos, 30); // Cache por 30 segundos
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

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
