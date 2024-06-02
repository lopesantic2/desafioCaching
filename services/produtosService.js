const db = require('../configs/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM produtos');
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
};

exports.create = async (nome, descricao, preco) => {
    await db.query('INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)', [nome, descricao, preco]);
};


exports.update = async (id, nome, descricao, preco, data_atualizado) => {
    await pool.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?', [nome, descricao, preco, data_atualizado, id]);
};

exports.remove = async (id) => {
    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
};
