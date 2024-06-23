require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const clientesRoutes = require('./routes/clientesRoutes'); // Certifique-se de que o caminho está correto
const produtosRoutes = require('./routes/produtosRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');

const app = express();
const port = 3090;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem Vindo a minha Aplicação!');
});

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
