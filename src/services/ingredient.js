const db = require("../db/mongo");
const getList = async () => {
    return db.Ingredient.find({});
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