const express = require('express'),
    router = express.Router();

const ingredientController = require('../controllers/ingredient');
const {authenticateToken} = require("../core/jwt");

router.post('/', authenticateToken, async function(req, res) {
    // form-urlencoded
    const ingredientDTO = req.body;

    ingredientController.create(ingredientDTO).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

router.get('/', authenticateToken, async function(req, res) {
    let name = req.query.name;
    let type = req.query.type;
    let page = isNaN(Number(req.query.page)) || Number(req.query.page) < 1 ? 1 : Number(req.query.page);
    let limit = isNaN(Number(req.query.limit)) || Number(req.query.limit) < 1 ? 10 : Number(req.query.limit);

    let params = {
        name: name,
        type: type,
        page: page,
        limit: limit
    };

    ingredientController.getList(params).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

router.get('/around', authenticateToken, async function(req, res) {
    let name = req.query.name;
    let type = req.query.type;
    let geo = req.user.geo;

    let params = {
        name: name,
        type: type,
    };

    if (geo !== undefined) {
        params.geo = geo;
    }

    ingredientController.getListAround(params).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

module.exports = router;