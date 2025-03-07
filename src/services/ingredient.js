const db = require("../db/mongo");
const getList = async (params) => {
    let filter = {};
    if (params.name !== undefined) {
        filter.name = params.name;
    }

    if (params.type !== undefined) {
        filter.type = params.type;
    }

    // Pagination
    let skip = (params.page - 1) * params.limit;
    let limit = params.limit;

    return db.Ingredient.find(filter).skip(skip).limit(limit);
}

const create = async (ingredientDTO) => {
    let data = db.Ingredient.create(ingredientDTO);
    data.then((result) => {
        return result;
    }).catch((err) => {
        return err;
    });
}

module.exports = {
    getList,
    create
}