// backend/tests/employees.test.js
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('GET / responds', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(200);
  expect(res.body.service).toBe('employee-backend');
});
