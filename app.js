const dotenv = require("dotenv");
dotenv.config();

const express = require('express')
const app = express()
const {urlencoded, json} = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 3000

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// app.use(urlencoded({ extended: true }), json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(process.env.DEFAULT_API_ROUTE + '/user', require('./src/api/user'))
app.use(process.env.DEFAULT_API_ROUTE + '/ingredient', require('./src/api/ingredient'))
app.use(process.env.DEFAULT_API_ROUTE + '/rhum', require('./src/api/rhum'))
app.use(process.env.DEFAULT_API_ROUTE + '/recette', require('./src/api/recette'))

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = {
    app,
    port
}