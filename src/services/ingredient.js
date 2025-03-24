const db = require("../db/mongo");
const geoService = require("./geo");
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

const findByIds = async (ids) => {
    return db.Ingredient.find({
        _id: {
            $in: ids
        }
    });
}

const getListAround = async (params) => {
    let filter = {};
    if (params.name !== undefined) {
        filter.name = params.name;
    }

    if (params.type !== undefined) {
        filter.type = params.type;
    }

    let list = await db.Ingredient.find(filter);
    if (params.geo !== undefined) {
        list = list.filter((ingredient) => {
            return geoService.isNear(ingredient.geo, params.geo);
        });
    }

    return list;
}

const search = async (name) => {
    let ingredients = await db.Ingredient.find({
        name: {
            $regex: name,
            $options: 'i'
        }
    });
    return ingredients;
}

module.exports = {
    getList,
    create,
    findByIds,
    getListAround,
    search
}