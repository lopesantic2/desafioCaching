const db = require('../configs/db');

exports.getAll = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos');
    return rows;
  } catch (err) {
    console.error('Erro ao buscar todos os produtos:', err);
    throw err;
  }
};

exports.getById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error(`Erro ao buscar o produto com ID ${id}:`, err);
    throw err;
  }
};

exports.create = async (nome, descricao, preco, data_atualizado) => {
  try {
    const [result] = await db.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado]);
    return { id: result.insertId, nome, descricao, preco, data_atualizado };
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    throw err;
  }
};

exports.update = async (id, nome, descricao, preco, data_atualizado) => {
  try {
    const [result] = await db.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?', [nome, descricao, preco, data_atualizado, id]);
    return result.affectedRows;
  } catch (err) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, err);
    throw err;
  }
};

exports.remove = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (err) {
    console.error(`Erro ao remover produto com ID ${id}:`, err);
    throw err;
  }
};
