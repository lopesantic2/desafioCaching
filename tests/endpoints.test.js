const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

describe('Endpoints Tests', () => {
  it('should successfully access the usuarios endpoint', async () => {
    const response = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should return 401 for accessing clientes endpoint without token', async () => {
    const response = await request(app).get('/clientes');
    expect(response.status).toBe(401);
  });

  it('should successfully access the clientes endpoint with token', async () => {
    const response = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
