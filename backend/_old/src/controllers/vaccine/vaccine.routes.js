const express = require('express');
const controller = require('./vaccine.controller');

// const Vaccine = require('../../models/vaccine.model.js');

// const logger = require('../../config/logger'); // ha szeretnénk itt is logolni: 4.3. feldathoz

const router = express.Router();
const seeder = require('../../seed/seeder_vaccines');

// SEED
router.get('/seed', async (req, res) => {
  await seeder();
  console.log('A vaccine adatok feltöltve!');
  res.send(`<h3>A vaccine adatok feltöltve!</h3>`);
});

module.exports = router;