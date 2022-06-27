const express = require('express');
require('dotenv').config(); // beolvassa a tartalmát, és itt(?a logger.js-ben is???) elérhetővé teszi a változókat
const config = require('config'); // a config mappa/default.json-ben keresi az értékeket.
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// const fileUpload = require('express-fileupload');
// const { join } = require('path');

const morgan = require("morgan");
const logger = require('./config/logger');

// todo Authenctication.
// const adminOnly = require('./auth/authenticate');
const authenticateJwt = require('./auth/authenticate');
const authHandler = require('./auth/authHandler');


const app = express(); // factory fv, ami létrehozza az alkalmazásunkat(szerverünket?).

// todo swagger docs
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { host, user, pass } = config.get('database');
mongoose.connect(`mongodb+srv://${host}`, {
    user,
    pass,
}).then(conn => logger.info("MongoDB csatlakozott."))
    .catch(err => {
        logger.error(err);
        process.exit();
        // throw new Error(err.message);
    });

// Cross origin resource sharing: CORS
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());  // ha json formátumú a kérés(=fejlécében szerepel az Application/json bejegyzés), akkor a body-t automatikusan objektummá parsolja


app.use(morgan('combined', {stream: logger.stream}));


// Upload files: nekem nem kell
// app.use(fileUpload());
// app.post('/upload', (req, res) => {
//     let uploadFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     uploadFile = req.files.uploadFile;
//     uploadPath = join('./public/img', uploadFile.name);

//     // Use the mv() method to place the file somewhere on your server
//     uploadFile.mv(uploadPath, (err) => {
//         if (err)
//             return res.status(500).send(err);

//         res.json({
//             success: true, 
//             name: uploadFile.name,
//             path: uploadPath.replace(/\\/g, '/').replace('public/', ''),
//         });
//     });
// });


// Routes
// app.use('/product', authenticateJwt, require('./controller/product/router'));
app.use('/book', require('./controller/book/router'));
app.use('/borrow', require('./controller/borrow/router'));
app.use('/librarian', require('./controller/librarian/router'));
app.use('/member', require('./controller/member/router'));
app.use('/user',  require('./controller/user/router'));
app.use('/login', require('./controller/login/router'));

// fejlesztési célokra:
// app.use('/product', require('./controller/product/router'));
// app.use('/category', require('./controller/category/router'));

// SEED
app.use('/seed', authenticateJwt, require('./controller/seeds/routes'));

app.use('/',  (req, res) => {
    console.log(req.url);
    res.send('api server');
});

// Mivel a "hibás" (ha hibás az előzőben az adott kontroller-metódus) kontrollerben next() lett hívva, az alábbi MW-re/sorra kerül a vezérlés(error-kezelő MW), a megkapott "err" objektummal:
app.use((err, req, res, next) => {
    console.error(`ERR ${err.statusCode}: ${err.message}`); // a node(VSC) konzolra írja! Ezt is meghagytam, sőt:
    logger.error(`ERR ${err.statusCode}: ${err.message}`); // "manuális log" a winston-logger-jével 4.2-3. feldathoz
  
    res.status(err.statusCode || 500); // ez megy a kliensnek
  
    res.json({
        hasError: true,
        message: 'Server Error',
    });
});

module.exports = app;
