const express = require('express'),
    router = express.Router();

const recetteController = require('../controllers/recette');
const {authenticateToken} = require("../core/jwt");

router.post('/', authenticateToken, async function(req, res) {
    // form-urlencoded
    const recetteDTO = req.body;

    recetteController.create(recetteDTO).then((data) => {
        res.send(data);
    });
});

router.get('/', authenticateToken, async function(req, res) {
    let name = req.query.name;
    let page = isNaN(Number(req.query.page)) || Number(req.query.page) < 1 ? 1 : Number(req.query.page);
    let limit = isNaN(Number(req.query.limit)) || Number(req.query.limit) < 1 ? 10 : Number(req.query.limit);

    let params = {
        name: name,
        page: page,
        limit: limit
    };

    recetteController.getList(params).then((data) => {
        res.send(data);
    });
});

module.exports = router;