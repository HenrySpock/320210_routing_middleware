const request = require('supertest');
const server = require('./server');
const items = require('./fakeDb');

describe('GET /list/items', () => {
  test('responds with a list of shopping items', async () => {
    const response = await request(server).get('/list/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(items);
  });
});

describe('POST /list/items', () => {
  test('adds a new item to the shopping list', async () => {
    const newItem = { name: 'apple', price: 0.5 };
    const response = await request(server).post('/list/items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ added: newItem });
    expect(items).toContainEqual(newItem);
  });
});

describe('GET /list/items/:name', () => {
  test('responds with a single item by name', async () => {
    const itemName = 'apple';
    const item = items.find((i) => i.name === itemName);
    const response = await request(server).get(`/list/items/${itemName}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(item);
  });

  test('responds with 404 if item not found', async () => {
    const itemName = 'nonexistent item';
    const response = await request(server).get(`/list/items/${itemName}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});

describe('PATCH /list/items/:name', () => {
  test('updates an existing item by name', async () => {
    const itemName = 'apple';
    const updatedItem = { name: 'green apple', price: 0.75 };
    const response = await request(server)
      .patch(`/list/items/${itemName}`)
      .send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: { name: 'green apple', price: 0.75 } });
    expect(items).toContainEqual(updatedItem);
  });

  test('responds with 404 if item not found', async () => {
    const itemName = 'nonexistent item';
    const response = await request(server).patch(`/list/items/${itemName}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});

describe('DELETE /list/items/:name', () => {
  test('deletes an existing item by name', async () => {
    const itemName = 'green apple';
    const response = await request(server).delete(`/list/items/${itemName}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
    expect(items).not.toContainEqual({ name: itemName, price: 0.75 });
  });

  test('responds with 404 if item not found', async () => {
    const itemName = 'nonexistent item';
    const response = await request(server).delete(`/list/items/${itemName}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });

  test('deletes all items in the list when name is "all"', async () => {
    const response = await request(server).delete(`/list/items/all`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'List cleared' });
    expect(items).toEqual([]);
  });
}); 

afterAll((done) => {
    server.close(done); // shutdown the server and exit the test
  }); 



