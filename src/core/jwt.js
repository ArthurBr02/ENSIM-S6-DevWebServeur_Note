const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    let formatedData = {
        _id: data._id.toString(),
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email
    }
    let token;
    try {
        token = jwt.sign(formatedData, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
    } catch (error) {
        console.log("Error while generating token: ", error);
    }
    return {token: token};
}

const authenticateToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
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