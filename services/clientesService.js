const db = require('../configs/db');

exports.getAll = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes');
    console.log('Consulta getAll: Todos os clientes recuperados');
    return rows;
  } catch (err) {
    console.error('Erro no getAll:', err);
    throw new Error('Falha ao recuperar todos os clientes');
  }
};

exports.getById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length === 0) {
      console.log(`Consulta getById: Nenhum cliente encontrado com o id ${id}`);
      return null;
    }
    console.log(`Consulta getById: Cliente com o id ${id} recuperado`);
    return rows[0];
  } catch (err) {
    console.error(`Erro no getById: ${err}`);
    throw new Error(`Falha ao recuperar o cliente com o id ${id}`);
  }
};

exports.create = async (nome, sobrenome, email, idade) => {
  try {
    const result = await db.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
    console.log('Consulta create: Novo cliente criado');
    return { id: result[0].insertId, nome, sobrenome, email, idade };
  } catch (err) {
    console.error('Erro no create:', err);
    throw new Error('Falha ao criar novo cliente');
  }
};

exports.update = async (id, nome, sobrenome, email, idade) => {
  try {
    const result = await db.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?', [nome, sobrenome, email, idade, id]);
    if (result[0].affectedRows === 0) {
      console.log(`Consulta update: Nenhum cliente encontrado para atualizar com o id ${id}`);
      return false;
    }
    console.log(`Consulta update: Cliente com o id ${id} atualizado`);
    return true;
  } catch (err) {
    console.error(`Erro no update: ${err}`);
    throw new Error(`Falha ao atualizar o cliente com o id ${id}`);
  }
};

exports.remove = async (id) => {
  try {
    const result = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    if (result[0].affectedRows === 0) {
      console.log(`Consulta remove: Nenhum cliente encontrado para deletar com o id ${id}`);
      return false;
    }
    console.log(`Consulta remove: Cliente com o id ${id} deletado`);
    return true;
  } catch (err) {
    console.error(`Erro no remove: ${err}`);
    throw new Error(`Falha ao deletar o cliente com o id ${id}`);
  }
};
