const db = require("../db/mongo");
const utils = require("../core/utils");
const passwordUtils = require("../core/password");
const jwtUtils = require("../core/jwt");

const getList = async () => {
    let data = db.User.find();
    data.then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });

    return data;
}

const register = async (userDTO) => {
    let data = db.User.create(userDTO);
    data.then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });

    return data;
}

const login = async (loginDTO) => {
    let data = await db.User.findOne({ email: loginDTO.email });
    if (data === null) {
        utils.asyncError("Identifiants incorrects")
        return;
    }

    let passwordMatch = await passwordUtils.comparePassword(loginDTO.password, data.password);

    if (!passwordMatch) {
        utils.asyncError("Identifiants incorrects")
        return;
    }

    return jwtUtils.generateToken(data);
}

const deleteUser = async (id) => {
    await db.User.findByIdAndDelete(id)
    .then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

module.exports = {
    getList,
    register,
    login,
    deleteUser
}