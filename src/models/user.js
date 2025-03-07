const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    id: { type: Number },
    firstname: { type: String, required: true, maxLength: 100 },
    lastname: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 150 },
});

exports.UserSchema = UserSchema;