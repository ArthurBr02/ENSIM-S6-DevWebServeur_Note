const { app } = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);
const userService = require('../src/services/user');

const route = process.env.DEFAULT_API_ROUTE + '/ingredient'
let tokenData;

beforeAll(async () => {
   tokenData = await userService.login({email: 'arthurbratigny@gmail.com', password: 'arthurtest'});
});

test('POST ' + route + '/ should create a new ingredient', async () => {
    let payload = {
        name: "Banane",
        type: "autres",
        price: 250.23,
        street: "17 rue Marceau",
        city: "Le Mans",
        postalCode: "72000"
    };
    let res = await requestWithSupertest
        .post(route + '/')
        .send(payload)
        .set('Authorization', 'Bearer ' + tokenData.token)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(200);

    payload = {
        name: "Carotte",
        type: "fruits",
        price: 250.56,
        street: "17 rue Marceau",
        city: "Le Mans",
        postalCode: "72000"
    };

    res = await requestWithSupertest
        .post(route + '/')
        .send(payload)
        .set('Authorization', 'Bearer ' + tokenData.token)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
});

test('POST ' + route + '/ should fail to create a new ingredient with 401', async () => {
    let payload = {
        name: "Banane",
        type: "autres",
        price: 250.23,
        street: "17 rue Marceau",
        city: "Le Mans",
        postalCode: "72000"
    };
    let res = await requestWithSupertest
        .post(route + '/')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(401);
});

test('GET ' + route + '/?name=Carotte&limit=1&page=1 should return a list of 1 element containing "Carotte"', async () => {
    let res = await requestWithSupertest
        .get(route + '/?name=Carotte&limit=1&page=1')
        .set('Authorization', 'Bearer ' + tokenData.token)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0].name).toBe('Carotte');
});

test('GET ' + route + '/around should return a list of ingredients in shops around the user', async () => {
    let res = await requestWithSupertest
        .get(route + '/around')
        .set('Authorization', 'Bearer ' + tokenData.token)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
});