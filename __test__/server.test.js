const request = require('supertest');
const app = require('../src/server/index');


describe('GET /', () => {
  it('responds with status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});


describe('POST /api/coordinates', () => {
  it('responds with status code 200', async () => {
    const response = await request(app)
      .post('/api/coordinates')
      .send({ city: 'Paris', date: '2024-02-28' }); // Static payload for testing
    expect(response.statusCode).toBe(200);
  });
});
