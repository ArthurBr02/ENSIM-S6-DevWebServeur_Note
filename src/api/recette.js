const express = require('express'),
    router = express.Router();

const recetteController = require('../controllers/recette');
const {authenticateToken} = require("../core/jwt");

router.post('/', authenticateToken, async function(req, res) {
    // form-urlencoded
    const recetteDTO = req.body;
    recetteDTO.userId = req.user._id;

    recetteController.create(recetteDTO).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

router.get('/', authenticateToken, async function(req, res) {
    let name = req.query.name;
    let page = isNaN(Number(req.query.page)) || Number(req.query.page) < 1 ? 1 : Number(req.query.page);
    let limit = isNaN(Number(req.query.limit)) || Number(req.query.limit) < 1 ? 10 : Number(req.query.limit);

    // On ne retourne que les recettes publiques
    let params = {
        name: name,
        private: false,
        page: page,
        limit: limit
    };

    recetteController.getList(params).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

router.get('/me', authenticateToken, async function(req, res) {
    let name = req.query.name;
    let userId = req.user._id;
    let page = isNaN(Number(req.query.page)) || Number(req.query.page) < 1 ? 1 : Number(req.query.page);
    let limit = isNaN(Number(req.query.limit)) || Number(req.query.limit) < 1 ? 10 : Number(req.query.limit);

    let params = {
        name: name,
        userId: userId,
        page: page,
        limit: limit
    };

    recetteController.getList(params).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

router.put('/:id', authenticateToken, async function(req, res) {
    let recetteDTO = req.body;
    recetteDTO.userId = req.user._id;
    recetteDTO.id = req.params.id;

    recetteController.update(recetteDTO).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

module.exports = router;