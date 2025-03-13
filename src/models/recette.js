const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const RecetteSchema = new Schema({
    id: { type: Number },
    nom: { type: String, required: true },
    instructions: { type: String, required: true },
    rhum: { type: Object, required: true },
    ingredients: { type: Array, required: true },
    private: { type: Boolean, required: true },
});

exports.RecetteSchema = RecetteSchema;