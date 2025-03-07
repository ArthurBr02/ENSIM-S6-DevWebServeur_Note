const ingredientService = require('../services/ingredient');
const utils = require('../core/utils');
const create = async (ingredientDTO) => {

    // Check data integrity
    if (ingredientDTO.name === undefined) {
        return utils.asyncError("No name provided");
    }

    if (ingredientDTO.type === undefined) {
        return utils.asyncError("No type provided");
    }

    if (ingredientDTO.shopAddress === undefined) {
        return utils.asyncError("No shop address provided");
    }

    if (ingredientDTO.price === undefined) {
        return utils.asyncError("No price provided");
    }


    let data = ingredientService.create(ingredientDTO);
    data.then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

const getList = async (params) => {
    return ingredientService.getList(params);
}

module.exports = {
    create,
    getList
}