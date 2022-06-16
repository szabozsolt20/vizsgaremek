const express = require('express');
// const controller = require('./controllers');


const logger = require('../../config/logger');

const router = express.Router();
const seeder = require('../../seeds/seeders');

// SEED
router.get('/products', async (req, res) => {
  await seeder.product_seeder();
  console.log('A person adatok feltöltve!');
  logger.info('A person adatok feltöltve!');
  res.send(`<h3>A person adatok feltöltve!</h3>`);
});

module.exports = router;