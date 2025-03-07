const userService = require('../services/user');
const utils = require('../core/utils');
const passwordUtils = require('../core/password');

const register = async (userDTO) => {

    // Check data integrity
    if (userDTO.lastname === undefined) {
        return utils.asyncError("No lastname provided");
    }

    if (userDTO.firstname === undefined) {
        return utils.asyncError("No firstname provided");
    }

    if (userDTO.email === undefined) {
        return utils.asyncError("No email provided");
    }

    if (userDTO.password === undefined) {
        return utils.asyncError("No password provided");
    }

    // Hash password
    userDTO.password = await passwordUtils.hashPassword(userDTO.password);


    let data = userService.register(userDTO);
    data.then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

const login = async (loginDTO) => {
    // Check data integrity
    if (loginDTO.email === undefined) {
        return utils.asyncError("No email provided");
    }

    if (loginDTO.password === undefined) {
        return utils.asyncError("No password provided");
    }

    return await userService.login(loginDTO);
}

module.exports = {
    register,
    login
}