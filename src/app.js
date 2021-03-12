const express = require('express');
const app = express();
app.use(express.json());

const { Artist } = require('../src/models');

/// this file is the one that holds the https requests suchs as get, post etc.
app.get('/', (req, res) => {
   res.status(200).json({ result: 'Hello World' });
 });

module.exports = app;

