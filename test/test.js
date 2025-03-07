const server = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

const route = process.env.DEFAULT_API_ROUTE + '/pokemons'

describe('Pokemon Endpoints', () => {
    it('GET ' + route + '/ should show all users pokemons', async () => {
      const res = await requestWithSupertest.get(route + '/');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
    });

    it('GET ' + route + '/6 should return charizard\'s infos', async () => {
        const res = await requestWithSupertest.get(route + '/6');
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('name');
          expect(res.body.name.french).toBe('Dracaufeu');
      });

      it('GET ' + route + '/search?type=Fire&typeS=Flying&hp=106 should return Ho-Oh\'s infos at index 0', async () => {
          const res = await requestWithSupertest.get(route + '/search?type=Fire&typeS=Flying&hp=106');
            expect(res.status).toEqual(200);
            expect(res.type).toEqual(expect.stringContaining('json'));
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toHaveProperty('name');
            expect(res.body[0].name.french).toBe('Ho-Oh');
        });
  
  });