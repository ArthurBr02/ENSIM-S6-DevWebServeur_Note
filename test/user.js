const { app } = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);

const route = process.env.DEFAULT_API_ROUTE + '/user'

test('POST ' + route + '/register should create a new user', async () => {
    const payload = {email: 'arthurbratigny+fdgdgfdgdf@gmail.com', password: 'arthurtest', firstname: 'Arthur', lastname: 'Bratigny', street: "17 rue Marceau", city: "Le Mans", postalCode: "72000" };
    const res = await requestWithSupertest
        .post(route + '/register')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
});

test('POST ' + route + '/login should return a token', async () => {
    const payload = {email: 'arthurbratigny+fdgdgfdgdf@gmail.com', password: 'arthurtest' };
    const res = await requestWithSupertest
        .post(route + '/login')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('token');
});