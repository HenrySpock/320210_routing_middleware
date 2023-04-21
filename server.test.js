const request = require('supertest');
const app = require('./server');

describe('GET /mean', () => {
  it('returns the correct mean value', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,4');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mean', value: 2.5 });
  });

  it('handles invalid number input', async () => {
    const response = await request(app).get('/mean?nums=1,2,foo');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid number' });
  });

  it('handles empty input', async () => {
    const response = await request(app).get('/mean');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('GET /median', () => {
  it('returns the correct median value for odd number of input', async () => {
    const response = await request(app).get('/median?nums=1,3,5,7,9');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 5 });
  });

  it('returns the correct median value for even number of input', async () => {
    const response = await request(app).get('/median?nums=1,2,3,4');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 2.5 });
  });

  it('handles invalid number input', async () => {
    const response = await request(app).get('/median?nums=1,2,foo');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid number' });
  });

  it('handles empty input', async () => {
    const response = await request(app).get('/median');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('GET /mode', () => {
  it('returns the correct mode value for single mode', async () => {
    const response = await request(app).get('/mode?nums=1,2,3,3,4,5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mode', value: '3' });
  });

  it('returns the correct mode value for multiple modes', async () => {
    const response = await request(app).get('/mode?nums=1,2,2,3,3,4,5');
    expect(response.status).toBe(200);
    expect(['2', '3']).toContain(response.body.value);
  });

  it('handles invalid number input', async () => {
    const response = await request(app).get('/mode?nums=1,2,foo');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid number' });
  });

  it('handles empty input', async () => {
    const response = await request(app).get('/mode');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });
});
