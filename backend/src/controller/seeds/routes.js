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

router.get('/books', async (req, res) => {
  await seeder.book_seeder();
  console.log('A book adatok feltöltve!');
  logger.info('A book adatok feltöltve!');
  res.send(`<h3>A book adatok feltöltve!</h3>`);
});

router.get('/borrows', async (req, res) => {
  await seeder.borrow_seeder();
  console.log('A borrow adatok feltöltve!');
  logger.info('A borrow adatok feltöltve!');
  res.send(`<h3>A borrow adatok feltöltve!</h3>`);
});

router.get('/librarians', async (req, res) => {
  await seeder.librarian_seeder();
  console.log('A librarian adatok feltöltve!');
  logger.info('A librarian adatok feltöltve!');
  res.send(`<h3>A librarian adatok feltöltve!</h3>`);
});

router.get('/members', async (req, res) => {
  await seeder.member_seeder();
  console.log('A member adatok feltöltve!');
  logger.info('A member adatok feltöltve!');
  res.send(`<h3>A member adatok feltöltve!</h3>`);
});

router.get('/users', async (req, res) => {
  await seeder.user_seeder();
  console.log('A user adatok feltöltve!');
  logger.info('A user adatok feltöltve!');
  res.send(`<h3>A user adatok feltöltve!</h3>`);
});

module.exports = router;