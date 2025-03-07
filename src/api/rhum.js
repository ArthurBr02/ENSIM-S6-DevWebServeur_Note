const express = require('express'),
    router = express.Router();

const rhumController = require('../controllers/rhum');
const {authenticateToken} = require("../core/jwt");

router.get('/', authenticateToken, async function(req, res) {
    let name = req.query.name;
    let type = req.query.type;
    let pays = req.query.pays;
    let volume = req.query.volume;
    let degre = req.query.degre;
    let distillerie = req.query.distillerie;
    let categories = req.query.categories
    let embouteilleur = req.query.embouteilleur;

    let page = isNaN(Number(req.query.page)) || Number(req.query.page) < 1 ? 1 : Number(req.query.page);
    let limit = isNaN(Number(req.query.limit)) || Number(req.query.limit) < 1 ? 10 : Number(req.query.limit);

    let params = {
        name: name,
        type: type,
        pays: pays,
        volume: volume,
        degre: degre,
        distillerie: distillerie,
        categories: categories,
        embouteilleur: embouteilleur,
        page: page,
        limit: limit
    };

    rhumController.getList(params).then((data) => {
        res.send(data);
    });
});

module.exports = router;