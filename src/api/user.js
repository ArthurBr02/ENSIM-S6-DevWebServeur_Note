const express = require('express'),
    router = express.Router();

const userController = require('../controllers/user');
const {authenticateToken} = require("../core/jwt");

router.post('/register', async function(req, res) {
    // form-urlencoded
    const userDTO = req.body;

    userController.register(userDTO).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

router.post('/login', async function(req, res) {
    // form-urlencoded
    const loginDTO = req.body;

    userController.login(loginDTO).then((data) => {
        res.json(data);
    });
});

router.get('/me', authenticateToken, async function(req, res) {
    res.send(req.user);
});

module.exports = router;