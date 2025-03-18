const { app } = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);
const userService = require('../src/services/user');

const route = process.env.DEFAULT_API_ROUTE + '/rhum'
let tokenData;

beforeAll(async () => {
   tokenData = await userService.login({email: 'arthurbratigny@gmail.com', password: 'arthurtest'});
});

test('GET ' + route + '/?distillerie=Clarendon should return a list of 3 rhums from the "Clarendon" distillerie', async () => {
    let res = await requestWithSupertest
        .get(route + '/?distillerie=Clarendon&limit=3&page=1')
        .set('Authorization', 'Bearer ' + tokenData.token)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toHaveProperty('distillerie');
    expect(res.body[0].distillerie).toBe('Clarendon');
});