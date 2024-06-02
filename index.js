require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const clientesController = require('./controllers/clientesController');
const produtosController = require('./controllers/produtosController');

const app = express();
const port = 3090;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Importar o pacote node-cache
const NodeCache = require('node-cache');

// Criar uma nova instância de cache
const cache = new NodeCache();

// Adicionar um item ao cache com uma chave e um valor
cache.set('chave', 'valor');

// Obter o valor do cache com a chave
const valor = cache.get('chave');
console.log('Valor do cache:', valor);

// 60 segundos de tempo de vida
cache.set('chave2', 'valor2', 60); 

// Remove iten do Cache
cache.del('chave');

// Apaga todo o Caching
cache.flushAll();






// Middleware para parsing de JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem Vindo a minha Aplicação!');
});

// Rotas para clientes
app.get('/clientes', clientesController.getAll);
app.get('/clientes/:id', clientesController.getById);
app.post('/clientes', clientesController.create); // Rota para criar um novo cliente
app.put('/clientes/:id', clientesController.update); // Rota para atualizar um cliente
app.delete('/clientes/:id', clientesController.remove); // Rota para remover um cliente

// Rotas para produtos
app.get('/produtos', produtosController.getAll);
app.get('/produtos/:id', produtosController.getById);
app.post('/produtos', produtosController.create);
app.put('/produtos/:id', produtosController.update);
app.delete('/produtos/:id', produtosController.remove);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

(async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database');

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1);
    }
})();
