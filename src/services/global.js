const ingredientService = require('./ingredient');
const recetteService = require('./recette');
const rhumService = require('./rhum');

const search = async (name) => {
    let ingredients = await ingredientService.search(name);
    let recettes = await recetteService.search(name);
    let rhums = await rhumService.search(name);
    return {
        ingredients: ingredients,
        recettes: recettes,
        rhums: rhums
    };
}

module.exports = {
    search
}