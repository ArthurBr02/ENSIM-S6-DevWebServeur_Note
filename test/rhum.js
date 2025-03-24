const { app } = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);
const userService = require('../src/services/user');
const debug = require('debug');
const password = require('../src/core/password')

const route = process.env.DEFAULT_API_ROUTE + '/rhum'
let tokenData;

beforeAll(async () => {
    let random = Math.floor(Math.random() * 1000000);
    const payload = {email: `arthurbratigny+${random}@gmail.com`, password: 'arthurtest', firstname: 'Arthur', lastname: 'Bratigny', street: "17 rue Marceau", city: "Le Mans", postalCode: "72000" };

    payload.password = await password.hashPassword(payload.password);

    await userService.register(payload).then((result) => {
        debug.log(result);
    }).catch((err) => {
        debug.log(err);
    });
    tokenData = await userService.login({email: `arthurbratigny+${random}@gmail.com`, password: 'arthurtest'});
    //debug.log(tokenData);
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