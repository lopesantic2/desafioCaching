const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

describe('Validation Tests', () => {
  it('should return error for invalid email', async () => {
    const invalidClient = { nome: 'Joao', sobrenome: 'Silva', email: 'invalid-email', idade: 25 };
    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidClient);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(expect.arrayContaining([{ msg: 'Email inválido', param: 'email', location: 'body' }]));
  });

  it('should return error for invalid nome', async () => {
    const invalidClient = { nome: 'Jo', sobrenome: 'Silva', email: 'joao@teste.com', idade: 25 };
    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidClient);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(expect.arrayContaining([{ msg: 'Nome deve ter entre 3 e 255 caracteres', param: 'nome', location: 'body' }]));
  });

  it('should return error for invalid idade', async () => {
    const invalidClient = { nome: 'Joao', sobrenome: 'Silva', email: 'joao@teste.com', idade: 130 };
    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidClient);
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(expect.arrayContaining([{ msg: 'Idade deve ser um número positivo e menor que 120', param: 'idade', location: 'body' }]));
  });
});
