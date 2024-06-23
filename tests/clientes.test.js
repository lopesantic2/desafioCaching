const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

describe('Clientes Tests', () => {
  it('should return all clients', async () => {
    const response = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return a client by ID', async () => {
    const response = await request(app)
      .get('/clientes/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should create a new client', async () => {
    const newClient = { nome: 'Novo', sobrenome: 'Cliente', email: 'novo@cliente.com', idade: 30 };
    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(newClient);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should update a client', async () => {
    const updatedClient = { nome: 'Atualizado', sobrenome: 'Cliente', email: 'atualizado@cliente.com', idade: 35 };
    const response = await request(app)
      .put('/clientes/1')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedClient);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Cliente atualizado com sucesso');
  });

  it('should delete a client', async () => {
    const response = await request(app)
      .delete('/clientes/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Cliente removido com sucesso');
  });
});
