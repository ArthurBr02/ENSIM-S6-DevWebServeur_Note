const dotenv = require("dotenv");
dotenv.config();

const express = require('express')
const app = express()
const {urlencoded, json} = require("express");

const port = process.env.PORT || 3000

app.use(urlencoded({ extended: true }), json());

app.use(process.env.DEFAULT_API_ROUTE + '/user', require('./src/api/user'))
app.use(process.env.DEFAULT_API_ROUTE + '/ingredient', require('./src/api/ingredient'))
app.use(process.env.DEFAULT_API_ROUTE + '/rhum', require('./src/api/rhum'))
app.use(process.env.DEFAULT_API_ROUTE + '/recette', require('./src/api/recette'))

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./src/swagger/swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})