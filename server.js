const express = require('express');
const mysql = require('mysql2/promise');
const produtosController = require('./controllers/produtosController');
const NodeCache = require('node-cache');
const fs = require('fs');
const app = express();
const cache = new NodeCache();


function cacheMiddleware(req, res, next) {
    const chaveCache = 'produtos';

    // Verifica se os produtos estão no cache
    const produtosCache = cache.get(chaveCache);
    if (produtosCache !== undefined) {
    console.log('Produtos recuperados do cache');
    res.json(produtosCache); // Retorna do cache
    } else {
    console.log('Produtos não encontrados no cache');
    // Salva os produtos no cache
    cache.set(chaveCache, produtos, 300); // Cache 5m
    res.json(produtos); // Retorna os produtos
    }
   }

   app.post('/produtos', (req, res) => {
    const novoProduto = { id: produtos.length + 1, nome: 'Novo Produto', preco: 15.00 };
    produtos.push(novoProduto);
    cache.del('produtos');
    console.log('Novo produto adicionado:', novoProduto);
    res.json({ message: 'Novo produto adicionado com sucesso' });
   });
   app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(produto => produto.id === parseInt(id));
    if (index !== -1) {
    produtos.splice(index, 1);
    cache.del('produtos');
    console.log('Produto removido:', id);
    res.json({ message: 'Produto removido com sucesso' });
    } else {
    res.status(404).json({ error: 'Produto não encontrado' });
    }
   });   

   
   // Rota para buscar todos os produtos
app.get('/produtos', cacheMiddleware);
// Inicia o servidor
const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});

app.put('/produto/:id', (req, res) => {
    const idProduto = parseInt(req.params.id);
    const novoNome = req.body.nome;
    const novoPreco = parseFloat(req.body.preco);

     // Atualiza o produto na lista de produtos
   const produtoAtualizado = produtos.find(produto => produto.id === idProduto);
   if (produtoAtualizado) {
   produtoAtualizado.nome = novoNome;
   produtoAtualizado.preco = novoPreco;
   const chaveCache = 'produtos';
   cache.del(chaveCache);
   res.json(produtoAtualizado);
   } else {
   res.status(404).send('Não encontrado');
   }

});