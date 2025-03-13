const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const IngredientSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: true, maxLength: 100 },
    type: { type: String, enum: ['fruits','épices','sucres','autres'], required: true, maxLength: 100 },
    price: { type: Number, required: true },
    street: { type: String, required: true, maxLength: 100 },
    city: { type: String, required: true, maxLength: 100 },
    postalCode: { type: String, required: true, maxLength: 100 },
    geo: { type: Object },
});

exports.IngredientSchema = IngredientSchema;