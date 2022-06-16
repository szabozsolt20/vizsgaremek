// const express = require('express'); // Én: ez itt nem is kell.
const createError = require("http-errors");
const logger = require('../../config/logger');


const vaccineService = require('./vaccine.service');

exports.create = (req, res, next) => {

  // 3.2 hibakezelés+
  const { name, efficiency } = req.body;
  if (!name || !efficiency) {
    return next(new createError.BadRequest("Request body must contain name, efficiency parameters"));
  };

  const newVaccine = { // így hozunk létre új vakcinát a séma segítségével
    name,
    efficiency
  };
  return vaccineService.create(newVaccine) // majd a service-ben hozzuk létre és mentjük az új vakcinát-t
    .then(createdVaccine => {
      res.status(201);
      res.json(createdVaccine); // már a db-től visszakapott adatot/infót küldjük a kliensnek
    })
    .catch(err => next(new createError.InternalServerError(err.message)));
}








/* 
exports.vaccinated = (req, res) => { // Én: a return, és a {} itt nem is kell.
  return personService.find({ vaccine: { $ne: 'none' } }, { vaccine: 1 })
    .then(people => {
      logger.debug(`GET/FindAll az oltott személyek tömbe: ${people.length} db lett.`);
      res.json(people);
    })
}


exports.count = async (req, res) => {
  const none = personService.count({ vaccine: 'none' });
  const all = personService.count();
  const count = (await all) - (await none);
  logger.debug(`Összesen ennyi az oltott(nem "none") person: ${count} db.`);
  res.send(`<h3>Az oltott(nem "none") személyek száma:  ${count}</h3>`);
}


exports.idVaccinated = async (req, res, next) => {
  const { id } = req.params;

  if (id.length != 24) {
    return next(new createError.NotFound("Nem helyes _id formátum!"))
  }

  const person = await personService.findById(id)  // nem ment az ObjectId("...")-val, csak így simán

  // 3.2 hibakezelés
  if (!person) {
    return next(new createError.NotFound("Nincs ilyen person!"))
  }

  const isVaccinated = person.vaccine === "none" ? "NEM" : "";
  res.send(`<h3>A ${req.params.id} _id-jű személy ${isVaccinated} rendelkezik oltással.</h3>`);

}


exports.deleteVaccinatedBy = async (req, res) => {
  deletedNr = (await personService.deleteMany({ vaccine: req.params.vaccine })).deletedCount
  remainNr = personService.count({});
  res.json(`A törölt személyek száma ${deletedNr}, új népesség: ${remainNr} személy.`); // a klien konzolra
};



exports.update = async (req, res, next) => {
  const { id, vaccine } = req.params;

  const oldPerson = await personService.findById(id)  // nem ment az ObjectId("...")-val, csak így simán
  const updatedPerson = {
    firstName: oldPerson.firstName,
    lastName: oldPerson.lastName,
    vaccine
  };

  let newPerson = {};
  try {
    newPerson = await personService.update(id, updatedPerson,); // A szerver-választ (új person-t) elmentjük person-ba.
  } catch (err) {
    return next(new createError.BadRequest(err));
  }
  return res.json(newPerson);

}
 */




/* Teszthez:
POST:

fetch('http://localhost:3000/person', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ firstName: 'New_firstName', lastName: 'New_lastName', vaccine: 'Pfizer' })
}).then(r => r.json())
  .then(d => console.log(d));

PUT:
_id-t az aktuálisan létezőt bemásolni!!!!:
fetch ("http://localhost:3000/person/629f68559f8ea859ab378ecd/Pfizer", {
       method: 'PUT',
           headers: {
           'content-type': 'application/json' 
           }
}).then(r=> r.json())
.then(d=> console.log(d))

DELETE:

fetch ("http://localhost:3000/person/none", {
       method: 'DELETE',
           headers: {
           'content-type': 'application/json' 
           }
}).then(r=> r.json())
.then(d=> console.log(d))

*/

