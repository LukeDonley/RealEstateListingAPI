const request = require('supertest');
const app = require('../server.js');

describe('Agent API', () => {
  it('should show all agents', async () => {
    const res = await request(app).get('/api/agents');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('agents');
  });

  it('should show a specific agent', async () => {
    const res = await request(app).get('/api/agents/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('agent');
  });
});
