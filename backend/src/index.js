require('dotenv').config(); // Itt már elhagyható?
const config = require('config'); // Itt már elhagyható?

const logger = require('./config/logger');
const app = require('./server');
const port = process.env.PORT || 3000  // legyen, ami az .env-ben van megadva, vagy 3000

// Database connect. 2022.05.26. konzin kicsit másabb az előzmény is.
if (!config.has('database')) { 
  logger.error("Nincs db config.");
  process.exit();
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});