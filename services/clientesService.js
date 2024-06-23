const db = require('../configs/db');

exports.getAll = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes');
    console.log('Query getAll:', rows);
    return rows;
  } catch (err) {
    console.error('Erro no getAll:', err);
    throw err;
  }
};

exports.getById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    console.log('Query getById:', rows);
    return rows[0];
  } catch (err) {
    console.error('Erro no getById:', err);
    throw err;
  }
};

exports.create = async (nome, sobrenome, email, idade) => {
  try {
    const result = await db.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
    console.log('Query create:', result);
    return { id: result.insertId, nome, sobrenome, email, idade };
  } catch (err) {
    console.error('Erro no create:', err);
    throw err;
  }
};

exports.update = async (id, nome, sobrenome, email, idade) => {
  try {
    const result = await db.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?', [nome, sobrenome, email, idade, id]);
    console.log('Query update:', result);
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Erro no update:', err);
    throw err;
  }
};

exports.remove = async (id) => {
  try {
    const result = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    console.log('Query remove:', result);
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Erro no remove:', err);
    throw err;
  }
};
