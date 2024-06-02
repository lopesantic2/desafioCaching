const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const pool = mysql.createPool(dbConfig);

const getAllClientes = async () => {
    const [rows] = await pool.query('SELECT * FROM clientes');
    return rows;
};

const getClienteById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0];
};

const createCliente = async (nome, sobrenome, email, idade) => {
    await pool.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
};

const updateCliente = async (id, nome, sobrenome, email, idade) => {
    await pool.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?', [nome, sobrenome, email, idade, id]);
};

const deleteCliente = async (id) => {
    await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
