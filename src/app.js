const express = require('express');
const app = express();
app.use(express.json());
const artistControllers = require('./controllers/artists')

const { Artist } = require('../src/models');

app.post('/artists', artistControllers.create);

module.exports = app;

