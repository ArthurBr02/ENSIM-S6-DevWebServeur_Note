const db = require("mongoose")
const dotenv = require("dotenv")
const debug = require("debug")
const { UserSchema } = require("../models/user")
const { IngredientSchema } = require("../models/ingredient");
const { RhumSchema } = require("../models/rhum");
const { RecetteSchema} = require("../models/recette");

dotenv.config()

db.connect(process.env.MONGO_URI).then(() => {
    debug.log("Connected to mongodb");
});

const User = db.model("abr_users", UserSchema);
const Ingredient = db.model("abr_ingredients", IngredientSchema);
const Rhum = db.model("rhums", RhumSchema);
const Recette = db.model("abr_recettes", RecetteSchema);

module.exports = {
    db,
    User,
    Ingredient,
    Rhum,
    Recette
}