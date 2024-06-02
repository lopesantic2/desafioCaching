const express = require('express');
const NodeCache = require('node-cache');
const app = express();
const cache = new NodeCache();

// Middleware de caching
function cacheMiddleware(req, res, next) {
    // Usando a URL como chave de cache
    const chave = req.originalUrl;
    // Tenta obter os dados do cache
    const dadosCache = cache.get(chave);
    if (dadosCache !== undefined) {
    // Envia a resposta com os dados do cache, se existirem
    console.log("Dados recuperados do cache para a URL:", chave);
    res.send(dadosCache);
    } else {
    // Continua com a próxima função de middleware
    console.log("Dados não encontrados no cache para a URL:", chave);
    next();
    }
   }

   // Rota de exemplo com caching
app.get('/dados', cacheMiddleware, (req, res) => {
    // Simula uma consulta ao banco de dados
    const dados = {
    id: 1,
    nome: 'Exemplo'
    };
    // Salva os dados no cache com uma duração de 10 segundos
    cache.set(req.originalUrl, dados, 10);
    // Envia os dados como resposta
    res.send(dados);
   });
   
   // Inicia o servidor Express
const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});