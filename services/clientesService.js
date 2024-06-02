const db = require('../configs/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0];
};

exports.create = async (nome, sobrenome, email, idade) => {
    await db.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
};

exports.update = async (id, nome, sobrenome, email, idade) => {
    await db.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?', [nome, sobrenome, email, idade, id]);
};

exports.remove = async (id) => {
    await db.query('DELETE FROM clientes WHERE id = ?', [id]);
};
