const ingredientService = require('../services/ingredient');
const utils = require('../core/utils');
const geoService = require("../services/geoService");
const create = async (ingredientDTO) => {

    // Check data integrity
    if (ingredientDTO.name === undefined) {
        return utils.asyncError("No name provided");
    }

    if (ingredientDTO.type === undefined) {
        return utils.asyncError("No type provided");
    }

    if (ingredientDTO.street === undefined) {
        return utils.asyncError("No street provided");
    }

    if (ingredientDTO.city === undefined) {
        return utils.asyncError("No city provided");
    }

    if (ingredientDTO.postalCode === undefined) {
        return utils.asyncError("No postal code provided");
    }

    if (ingredientDTO.price === undefined) {
        return utils.asyncError("No price provided");
    }

    const address = {
        street: ingredientDTO.street,
        city: ingredientDTO.city,
        postalCode: ingredientDTO.postalCode
    };

    let geoData = await geoService.findLocalisationByAddress(address);
    if (geoData !== null && geoData.length > 0) {
        ingredientDTO.geo = {
            lat: geoData[0].lat,
            lon: geoData[0].lon
        };
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