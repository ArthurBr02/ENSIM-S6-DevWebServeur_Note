const express = require('express'),
    router = express.Router();

const ingredientController = require('../controllers/ingredient');
const {authenticateToken} = require("../core/jwt");

router.post('/', authenticateToken, async function(req, res) {
    // form-urlencoded
    const ingredientDTO = req.body;

    ingredientController.create(ingredientDTO).then((data) => {
        res.send(data);
    });
});

router.get('/', authenticateToken, async function(req, res) {
    ingredientController.getList().then((data) => {
        res.send(data);
    });
});

module.exports = router;