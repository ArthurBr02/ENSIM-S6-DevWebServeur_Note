const jwt = require('jsonwebtoken');
const debug = require("debug");

const generateToken = (data) => {
    let formatedData = {
        _id: data._id.toString(),
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        street: data.street,
        city: data.city,
        postalCode: data.postalCode,
        geo: data.geo
    }
    let token;
    try {
        token = jwt.sign(formatedData, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
    } catch (error) {
        debug.log(`Error while generating token: ${error}`);
    }
    return {token: token};
}

const authenticateToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            debug.log(err)
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken,
    authenticateToken
}