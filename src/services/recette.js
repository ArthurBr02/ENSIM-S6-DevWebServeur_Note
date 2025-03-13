const db = require("../db/mongo");
const rhumService = require("./rhum");
const {findByIds} = require("./ingredient");
const utils = require("../core/utils");
const getList = async (params) => {
    let filter = {};
    if (params.name !== undefined) {
        filter.nom = params.name;
    }

    if (params.private !== undefined) {
        filter.private = params.private;
    }

    if (params.type !== undefined) {
        filter.type = params.type;
    }

    if (params.userId !== undefined) {
        filter.userId = params.userId;
    }

    // Pagination
    let skip = (params.page - 1) * params.limit;
    let limit = params.limit;

    return db.Recette.find(filter).skip(skip).limit(limit);
}

const create = async (recetteDTO) => {
    /*
    Dans le DTO on a:
    - id du rhum à ajouter
    - userId de l'utilisateur
    - une liste d'id d'ingrédients
    - un nom de recette
    - un champ d'instructions
    - un booléen pour indiquer si la recette est privée ou publique
     */

    let rhum = await rhumService.findById(recetteDTO.rhumId);
    if (rhum === null) {
        return utils.asyncError("Rhum not found");
    }

    let ingredients = await findByIds(JSON.parse(recetteDTO.ingredientIds));
    if (ingredients === null || ingredients.length === 0) {
        return utils.asyncError("Ingredients not found");
    }

    let creationData = {
        userId: recetteDTO.userId,
        nom: recetteDTO.name,
        instructions: recetteDTO.instructions,
        ingredients: ingredients,
        rhum: rhum,
        private: recetteDTO.private
    };

    let data = db.Recette.create(creationData);

    data.then((result) => {
        return result;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

const findById = async (id) => {
    return db.Recette.findById(id);
}

const update = async (recetteDTO) => {
    let rhum = await rhumService.findById(recetteDTO.rhumId);
    if (rhum === null) {
        return utils.asyncError("Rhum not found");
    }

    let ingredients = await findByIds(JSON.parse(recetteDTO.ingredientIds));
    if (ingredients === null || ingredients.length === 0) {
        return utils.asyncError("Ingredients not found");
    }

    let creationData = {
        userId: recetteDTO.userId,
        nom: recetteDTO.name,
        instructions: recetteDTO.instructions,
        ingredients: ingredients,
        rhum: rhum,
        private: recetteDTO.private
    };

    let data = db.Recette.findByIdAndUpdate(recetteDTO.id, creationData);

    data.then((result) => {
        return result;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

module.exports = {
    getList,
    create,
    findById,
    update
}