const path = require('path');
const winston = require('winston');

const options = {
  file: {
    level: process.env.LOG_LEVEL_FILE, // a level a logolás részletességét határozza meg
    filename: path.join(__dirname, '..', '..', 'app.log'),
    format: winston.format.json() // fájlba, JSON formátumban logoljunk!
  },
  console: {
    level: process.env.LOG_LEVEL_CONSOLE
  },
};

const logger = winston.createLogger({
  format: winston.format.simple(),  // ez csak "default"nak, ha nem lenne megadva az option-ban
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// Azt szeretnénk még elérni, hogy a morgan is a winston objektumot használja a HTTP-kérések logolására, 
// ehhez az elkészített logger objektumunkhoz kell készítenünk egy stream objektumot egy write() metódussal:

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;