const db = require("mongoose")
const dotenv = require("dotenv")
const { UserSchema } = require("../models/user")
const { IngredientSchema } = require("../models/ingredient");
const { RhumSchema } = require("../models/rhum");
const { RecetteSchema} = require("../models/recette");

dotenv.config()

db.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to mongodb");
});

const User = db.model("abr_users", UserSchema);
const Ingredient = db.model("abr_ingredients", IngredientSchema);
const Rhum = db.model("rhums", RhumSchema);
const Recette = db.model("abr_recettes", RecetteSchema);

module.exports = {
    User,
    Ingredient,
    Rhum,
    Recette
}