const request = require('supertest');
const app = require('../app.js');

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

  it('should create a new agent', async () => {
    const res = await request(app).post('/api/agents').send({
      first_name: 'New',
      last_name: 'User',
      email: 'new@user.com',
      phone: '333-999-4321'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('agent');
  });

  it('should update an agent', async () => {
    const res = await request(app).put('/api/agents/1').send({
      first_name: 'Updated'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.updatedAgent.first_name).toBe('Updated');
  });

  it('should delete an agent', async () => {
    const res = await request(app).delete('/api/agents/1');
    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual({});
  });
});

describe('Listing API', () => {
  it('should show all listings', async () => {
    const res = await request(app).get('/api/listings');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('listings');
  });

  it('should show a specific listing', async () => {
    const res = await request(app).get('/api/listings/1111111');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('listing');
  });

  it('should create a new listing', async () => {
    const res = await request(app)
      .post('/api/listings')
      .send({
        mls_number: '1234567',
        address_line_1: '1234 Test Ave',
        address_line_2: 'Unit 101',
        city: 'Minnapolis',
        state: 'Minnesota',
        postal_code: '55404',
        asking_price: '300000.00',
        listing_date: '2020-12-12',
        agent_ids: [2, 3]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('listing');
  });

  it('should update an listing', async () => {
    const res = await request(app).put('/api/listings/1111111').send({
      city: 'St. Paul'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.updatedListing.city).toBe('St. Paul');
  });

  it('should delete a listing', async () => {
    const res = await request(app).delete('/api/listings/1111111');
    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual({});
  });
});
