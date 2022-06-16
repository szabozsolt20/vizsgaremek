require('dotenv').config(); // beolvassa a tartalmát, és itt(?a logger.js-ben is???) elérhetővé teszi a változókat
const config = require('config'); // a config mappa/default.json-ben keresi az értékeket.

const express = require('express');
const bodyParser = require('body-parser');

const morgan = require("morgan");
const logger = require('./config/logger'); // 4.3. feldathoz

const mongoose = require('mongoose');

const app = express(); // factory fv, ami létrehozza az alkalmazásunkat(szerverünket?).

// todo Authenctication.
// const adminOnly = require('./auth/adminOnly');
const authenticateJwt = require('./auth/authenticate');
const authHandler = require('./auth/authHandler');


const {username, password, host} = config.get('database'); // vegye ezeket a default.json-ből a "database"-ből!

mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, {
  useNewUrlParser: true, // új url értelmezőt használjon enélkül is megy
  useUnifiedTopology: true  // hogyan térképezze fel az adatbázist enélkül is megy
  // ezen propertik nélkül is megy, sőt, úgy is, ha a csati stringet és uer/pass paramétereket úgy adom meg, mint a konzisban:
  // pl:   user:'dbUser',  pass: 'QXoi0LIEi2yByKgu'
})
  .then(() => logger.info("MongoDB csatlakozott."))
  .catch(err => {
    logger.error(err);
    process.exit();
  });



// todo swagger docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('combined', {stream: logger.stream}));

app.use(bodyParser.json()); // ha json formátumú a kérés(=fejlécében szerepel az Application/json bejegyzés), akkor a body-t automatikusan objektummá parsolja

// Routers
app.post('/login', authHandler.login); // ha kapunk egy post-ot a /login url-re, akkor fusson le a './auth/authHandler' exports.login-ja itt, mint MW, aminek hatására vagy hibaüzit kap a user, vagy accessToken-t
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

// todo : "authenticateJwt"-t beékelni
app.use('/book',  require('./controllers/person/person.routes'));


// hibakezelő middleware függvény, amely kilogolja a valódi hibát a konzolra, majd a kliens számára valamilyen - a hibától független - 
// átlátszó kifogást küld vissza üzenetben. Ha nincs más státuszkód definiálva, akkor adjon 500-as hibakódot.

// Mivel a "hibás" (ha hibás az előzőben az adott kontroller-metódus) kontrollerben next() lett hívva, az alábbi MW-re/sorra kerül a vezérlés(error-kezelő MW), a megkapott "err" objektummal:
app.use((err, req, res, next) => {
  console.error(`ERR ${err.statusCode}: ${err.message}`); // a node(VSC) konzolra írja! Ezt is meghagytam, sőt:
  logger.error(`ERR ${err.statusCode}: ${err.message}`); // "manuális log" a winston-logger-jével 4.2-3. feldathoz

  res.status(err.statusCode || 500); // ez megy a kliensnek
  res.json({  
    hasError: true,
    message: "Most éppen nem engedi a költségvetés."
  });
});


module.exports = app;