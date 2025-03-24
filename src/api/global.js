const express = require('express'),
    router = express.Router();


const globalController = require('../controllers/global');
const {authenticateToken} = require("../core/jwt");

router.get('/search', authenticateToken, async function(req, res) {
    let name = req.query.name;
    globalController.search(name).then((data) => {
        let code = data?.code;
        if (code === undefined) {
            code = 200;
        }
        res.status(code).send(data);
    });
});

module.exports = router;