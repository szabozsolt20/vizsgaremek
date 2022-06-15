const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => { // Ez írja le, mi történjen, ha kap egy kérést a szerverünk, amit az app-ban létrehoztunk
  res.send('<h1>Hello World!</h1>');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
