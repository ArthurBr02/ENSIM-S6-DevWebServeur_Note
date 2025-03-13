const recetteService = require('../services/recette');
const utils = require('../core/utils');
const create = async (recetteDTO) => {

    // Check data integrity
    if (recetteDTO.name === undefined) {
        return utils.asyncError("No name provided");
    }

    if (recetteDTO.instructions === undefined) {
        return utils.asyncError("No instruction provided");
    }

    if (recetteDTO.ingredientIds === undefined || recetteDTO.ingredientIds.length === 0) {
        return utils.asyncError("No ingredients provided");
    }

    if (recetteDTO.rhumId === undefined) {
        return utils.asyncError("No rhum provided");
    }

    let data = recetteService.create(recetteDTO);
    data.then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

const getList = async (params) => {
    return recetteService.getList(params);
}

module.exports = {
    create,
    getList
}