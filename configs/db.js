require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

const createClientesTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            sobrenome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            idade INT NOT NULL
        )
    `);
};

const createProdutosTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            descricao VARCHAR(255) NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            data_atualizado DATETIME NOT NULL
        )
    `);
};

// Crie as tabelas apenas se elas não existirem
const createTables = async () => {
    try {
        await createClientesTable();
        await createProdutosTable();
        console.log('Tabelas criadas com sucesso.');
    } catch (err) {
        console.error('Erro ao criar as tabelas:', err);
    }
};

createTables();

module.exports = pool;
