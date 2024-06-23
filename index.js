require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { invalidateCache } = require('./middlewares/cacheMiddleware');

const app = express();
const port = 3090;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Middleware para parsing de JSON
app.use(express.json());

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
app.use('/clientes', clientesRoutes);

// Rotas para produtos (sem autenticação JWT)
app.use('/produtos', produtosRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

const startServer = async () => {
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
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

module.exports = app;
