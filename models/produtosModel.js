const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const pool = mysql.createPool(dbConfig);

const getAllProdutos = async () => {
  const [rows] = await pool.query('SELECT * FROM produtos');
  return rows;
};

const getProdutoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
  return rows[0];
};

const createProduto = async (nome, descricao, preco, data_atualizado) => {
  const [result] = await pool.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado]);
  return { id: result.insertId, nome, descricao, preco, data_atualizado };
};

const updateProduto = async (id, nome, descricao, preco, data_atualizado) => {
  const [result] = await pool.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?', [nome, descricao, preco, data_atualizado, id]);
  return result.affectedRows;
};

const deleteProduto = async (id) => {
  const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
};
