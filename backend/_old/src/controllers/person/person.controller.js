const express = require('express'); // Én: ez itt nem is kell.
const createError = require("http-errors");
const logger = require('../../config/logger'); // ha szeretnénk itt is logolni: 4.3. feldathoz


const personService = require('./person.service'); // és ezzel refaktoráltuk a metódusokat.
const vaccineService = require('../vaccine/vaccine.service'); // és ezzel refaktoráltuk a metódusokat.

// GET /person/vaccinated végpont használja, amely csak a beoltott személyek adatait adja vissza
exports.vaccinated = (req, res) => { // Én: a return, és a {} itt nem is kell.
  return personService.find({ "vaccine.count": { $ne: 0 } }, { vaccine: 1 })
    .then(people => {
      logger.debug(`GET/FindAll az oltott személyek tömbje: ${people.length} db lett.`);
      res.json(people);
    })
}

// GET /person/count végpont használja, amely visszaadja az oltott személyek számát
exports.count = async (req, res) => {
  const none = personService.count({ "vaccine.count": 0 });
  const all = personService.count();
  const count = (await all) - (await none);
  logger.debug(`Összesen ennyi az oltott(nem "none") person: ${count} db.`);
  // res.send(`<h3>Az oltott(nem "vaccine.count=0") személyek száma:  ${count}</h3>`);
  res.send(`<h3>Az oltott(nem "vaccine.count=0") személyek száma:  ${count}</h3>`); // a teszt paranccsal res.json()-re írná ki
}

// GET /person/:id/vaccinated végpont, amely visszaadja, hogy az adott id-val rendelkező személy rendelkezik-e oltással
exports.idVaccinated = async (req, res, next) => {
  const { id } = req.params;

  if (id.length != 24) {
    return next(new createError.NotFound("Nem helyes _id formátum!"))
  }

  const person = await personService.findById(id)  // nem ment az ObjectId("...")-val, csak így simán
  logger.info(person);
  // 3.2 hibakezelés
  if (!person) {
    return next(new createError.NotFound("Nincs ilyen person!"))
  }

  const isVaccinated = person.vaccine.count === 0 ? "NEM" : "";
  res.send(`<h3>A ${req.params.id} _id-jű személy ${isVaccinated} rendelkezik oltással.</h3>`);

}

// DETELE /person/:vaccine végpont használja, amely a vaccine típusú oltással rendelkező személyeket törli az adatbázisból
exports.deleteVaccinatedBy = async (req, res) => {
  const vaccine_id = (await vaccineService.findOne({ name: req.params.vaccine }))._id;

  deletedNr = (await personService.deleteMany({ "vaccine.vaccine": vaccine_id })).deletedCount;
  remainNr = await personService.count({});
  res.json(`A törölt személyek száma ${deletedNr}, új népesség: ${remainNr} személy.`); // a kliens konzolra
};

// POST /person végpont használja, amellyel új személyt vehetünk fel a nyilvántartásba.
exports.create = (req, res, next) => {

  // 3.2 hibakezelés+
  const { firstName, lastName, vaccine } = req.body;
  if (!firstName || !lastName || !vaccine) {
    return next(new createError.BadRequest("Request body must contain firstName, lastName, vaccine parameters"));
  };

  const newPerson = { // így hozunk létre új személyt a séma segítségével
    firstName,
    lastName,
    vaccine
  };
  return personService.create(newPerson) // majd a service-ben hozzuk létre és mentjük az új person-t
    .then(createdPerson => {
      res.status(201);
      res.json(createdPerson); // már a db-től visszakapott adatot/infót küldjük a kliensnek
    })
    .catch(err => next(new createError.InternalServerError(err.message)));
}

// PUT /person/:id/:vaccine végpont használja, amellyel megadhatjuk, hogy az adott id-val rendelkező személy vaccine típusú oltást kapott.
exports.update = async (req, res, next) => {
  const { id, vaccine } = req.params;
  const vaccine_id = (await vaccineService.findOne({ name: req.params.vaccine }))._id;


  const oldPerson = await personService.findById(id)  // nem ment az ObjectId("...")-val, csak így simán
  const updatedPerson = {
    firstName: oldPerson.firstName,
    lastName: oldPerson.lastName,
    vaccine: {
      vaccine: vaccine_id,
      count: oldPerson.vaccine.count + 1
    }
  };

  let newPerson = {};
  try {
    newPerson = await personService.update(id, updatedPerson,); // A szerver-választ (új person-t) elmentjük person-ba.
  } catch (err) {
    return next(new createError.BadRequest(err));
  }
  return res.json(newPerson);

}

/* Teszthez:
POST:

fetch('http://localhost:3000/person', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0OTg1MjgzLCJleHAiOjE2NTUwMjEyODN9.ZCSYBp-ufwDMr-n0JQn2hyl3umZJFliPOhNWQI1xgW8'
  },
  body: JSON.stringify({ firstName: 'New_firstName', lastName: 'New_lastName',  
  vaccine: {
    vaccine: '62a45f78c986e49957c17be1',
    count: 99
  }
 })
}).then(r => r.json())
  .then(d => console.log(d));

PUT:
_id-t az aktuálisan létezőt bemásolni!!!!:
fetch ("http://localhost:3000/person/62a46e13fbaffd3b5f4046f4/Pfizer", {
       method: 'PUT',
           headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0OTg1MjgzLCJleHAiOjE2NTUwMjEyODN9.ZCSYBp-ufwDMr-n0JQn2hyl3umZJFliPOhNWQI1xgW8'
  }
}).then(r=> r.json())
.then(d=> console.log(d))

DELETE:

fetch ("http://localhost:3000/person/Sputnik", {
       method: 'DELETE',
           headers: {
           'content-type': 'application/json' 
           }
}).then(r=> r.json())
.then(d=> console.log(d))

"Sputnik_2"-es person objektum:
{
  "_id": {
    "$oid": "62a4600ac986e49957c17be8"
  },
  "firstName": "John",
  "lastName": "Doe",
  "vaccine": {
    "vaccine": {
      "$oid": "62a45f78c986e49957c17be1"
    },
    "count": 1
  },
  "__v": 0,
  "createdAt": {
    "$date": {
      "$numberLong": "1654814621563"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1654814621563"
    }
  }
}
*/

