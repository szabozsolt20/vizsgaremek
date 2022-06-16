const express = require('express');
const controller = require('./person.controller');



const Person = require('../../models/person.model.js'); // 5.feladat

const logger = require('../../config/logger'); // ha szeretnénk itt is logolni: 4.3. feldathoz

const router = express.Router();
const seeder = require('../../seed/seeder');

// Authenctication.
const adminOnly = require('../../auth/adminOnly');

// SEED
router.get('/seed_nested_person', async (req, res) => {
  await seeder.seed_nested_person();
  console.log('A person adatok feltöltve!');
  res.send(`<h3>A person adatok feltöltve!</h3>`);
});

router.get('/seed_user', async (req, res) => {
  await seeder.seed_user();
  console.log('A user adatok feltöltve!');
  res.send(`<h3>A user adatok feltöltve!</h3>`);
});



// 1.1. GET /person/count végpont, amely visszaadja az oltott személyek számát & 6.3.
router.get('/count', async (req, res) => {
  return controller.count(req, res);
});

// 1.2. GET /person/vaccinated végpont, amely csak a beoltott személyek adatait adja vissza & 6.3.
router.get('/vaccinated', (req, res) => {
  return controller.vaccinated(req, res);
});


// 2.1. GET /person/:id/vaccinated végpont, amely visszaadja, hogy az adott id-val rendelkező személy rendelkezik-e oltással & 6.3.
router.get('/:id/vaccinated', async (req, res, next) => {
  return controller.idVaccinated(req, res, next);
});


// 2.2. POST /person végpont, amellyel új személyt vehetünk fel a nyilvántartásba & 6.3.
router.post('/', adminOnly, (req, res, next) => { // nem kelelnek a return-ök (?)
  return controller.create(req, res, next);
});


// 2.3. PUT /person/:id/:vaccine végpont, amellyel megadhatjuk, hogy az adott id-val rendelkező személy vaccine típusú oltást kapott.
router.put('/:id/:vaccine', adminOnly, (req, res, next) => {
  return controller.update(req, res, next);
});


// DELETE /person/:vaccine végpont, amely a vaccine típusú oltással rendelkező személyeket törli az adatbázisból & 6.3.
router.delete('/:vaccine', adminOnly, (req, res) => {
  return controller.deleteVaccinatedBy(req, res);
});


module.exports = router;
