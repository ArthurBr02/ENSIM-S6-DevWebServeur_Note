const db = require("../db/mongo");
const getList = async (params) => {
    let filter = {};
    if (params.name !== undefined) {
        filter.name = params.name;
    }

    if (params.type !== undefined) {
        filter.type = params.type;
    }

    if (params.pays !== undefined) {
        filter.pays = params.pays;
    }

    if (params.volume !== undefined) {
        filter.volume = params.volume;
    }

    if (params.degre !== undefined) {
        filter.degre = params.degre;
    }

    if (params.distillerie !== undefined) {
        filter.distillerie = params.distillerie;
    }

    if (params.categories !== undefined) {
        filter.categories = params.categories;
    }

    if (params.embouteilleur !== undefined) {
        filter.embouteilleur = params.embouteilleur;
    }

    // Pagination
    let skip = (params.page - 1) * params.limit;
    let limit = params.limit;

    return db.Rhum.find(filter).skip(skip).limit(limit);
}

module.exports = {
    getList,
}