import { encode } from 'node:querystring';
import request from 'supertest';
import { v4 as uuid } from 'uuid';
import { server } from '../src/index';
import { users } from '../src/users';

const testUser = {
  username: 'username',
  age: 'age',
  hobbies: ['hobby'],
};

describe('happy path of all actions', () => {
  let testUserId: string;

  test('should respond with empty list of users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('should create new user and respond with his data', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(encode(testUser));
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ...testUser, id: expect.any(String) });
    testUserId = response.body.id;
  });

  test('should respond with list containing new user', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ ...testUser, id: testUserId }]);
  });

  test('should get user by id', async () => {
    const response = await request(server).get(`/api/users/${testUserId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...testUser, id: testUserId });
  });

  test('should update user and respond with updated user', async () => {
    const newUsername = 'newUsername';
    const response = await request(server)
      .put(`/api/users/${testUserId}`)
      .send(encode({ username: newUsername }));
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...testUser,
      username: newUsername,
      id: testUserId,
    });
  });

  test('should delete user and respond with empty response', async () => {
    const response = await request(server).delete(`/api/users/${testUserId}`);
    expect(response.status).toBe(204);
    expect(response.body).toBeNull;
  });

  test('should not find deleted user by id', async () => {
    const response = await request(server).get(`/api/users/${testUserId}`);
    expect(response.status).toBe(404);
  });

  afterAll(() => server.close());
});

describe('handling of incorrect input', () => {
  beforeAll(async () => {
    await request(server).post('/api/users').send(encode(testUser));
  });

  test('should respond to GET with error 400 if user id is not correct uuid', async () => {
    const response = await request(server).get('/api/users/not-uuid');
    expect(response.status).toBe(400);
  });

  test('should respond to GET with error 404 if user with provided id is not found', async () => {
    const response = await request(server).get(`/api/users/${uuid()}`);
    expect(response.status).toBe(404);
  });

  test('should respond to POST with error 400 if request does not have required fields', async () => {
    const response = await request(server)
      .post('/api/users')
      .send(encode({ username: 'username' }));
    expect(response.status).toBe(400);
  });

  test('should respond to PUT with error 400 if user id is not correct uuid', async () => {
    const response = await request(server)
      .put('/api/users/not-uuid')
      .send({ username: 'newUsername' });
    expect(response.status).toBe(400);
  });

  test('should respond to PUT with error 404 if user with provided id is not found', async () => {
    const response = await request(server)
      .put(`/api/users/${uuid()}`)
      .send({ username: 'newUsername' });
    expect(response.status).toBe(404);
  });

  test('should respond to DELETE with error 400 if user id is not correct uuid', async () => {
    const response = await request(server).delete('/api/users/not-uuid');
    expect(response.status).toBe(400);
  });

  test('should respond to DELETE with error 404 if user with provided id is not found', async () => {
    const response = await request(server).delete(`/api/users/${uuid()}`);
    expect(response.status).toBe(404);
  });

  test('should respond with 404 when non-existing endpoint requested', async () => {
    const response = await request(server).get('/api/pumpkins');
    expect(response.status).toBe(404);
  });

  afterAll(() => server.close());
});

describe('handling server errors', () => {
  beforeEach(() => {
    users.list = jest.fn().mockImplementation(() => {
      throw new Error('message');
    });
  });

  test('should respond with 500', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(500);
  });
});
