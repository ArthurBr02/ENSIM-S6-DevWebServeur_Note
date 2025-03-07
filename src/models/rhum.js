const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RhumSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: true, maxLength: 100 },
    rxid_number: { type: String, required: true },
    pays: { type: String, required: true },
    distillerie: { type: String, required: true },
    ABV: { type: Number, required: true },
    categorie: { type: String, required: true },
    vintage: { type: Number, required: true },
    fabriqueAvec: { type: String, required: true },
    distillation: { type: String, required: true },
    volume: { type: String, required: true },
    age: { type: Number, required: true },
    type: { type: String, required: true },
    degre: { type: Number, required: true },
    imagePath: { type: String, required: true },
    visible: { type: Boolean, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

exports.RhumSchema = RhumSchema;