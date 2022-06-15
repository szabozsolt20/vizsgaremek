const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // ez végzi el az autentikációt
  const authHeader = req.headers.authorization; // a headerből kiolvassuk az authorization-t

  if (authHeader) {
    // kb így néz ki az authHeader: "Bearer lskdfjlkdsjfldsjflsdfj" (ez utóbbi tag a token, az első az autorizáció típusa)
    const token = authHeader.split(' ')[1];  // kiolvasom a tokent
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // összevetjük: a kapott tokent a letárolt titkossal kódoltan/"kombinálva"
      if (err) {
        return res.sendStatus(401); // 401: nem sikerült beazonosítani
      }

      req.user = user; // itt beállítjuk a req-nek, hogy legyen egy .user-je, ha sikerült azonosítani. Ezt így fogja megkapni pl. az adminOnly, ha azt is lefuttatjuk, és tovább engedhet
      next();
    });
  } else {
    res.sendStatus(401); // 401: nem azonosított felhasználó / nem volt elérhető az infó
  }
};

// Valami rossz tokennel:
/* fetch('http://localhost:3000/person/vaccinated', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer lskdfjlkdsjfldsjflsdfj'
  }
}).then(r => r.json())
  .then(d => console.log(d));


Bejelentkezek, tehát küldök egy post-ot a /login url-re (amire meg fogom kapni a token-emet). Be kell küldenem egy valid user/pw adatot a login.js-ből:
fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'user', password: 'user_pw'})
}).then( r => r.json() )
.then( d => console.log(d) );

Erre vissza küldött egy webtoken-t (accessToken, a login.js-ből a köv. sorral):  res.json({accessToken}); // új ES6 szabvány szerinti obj
accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTY1NDM4NDU5NX0.h60NorG7ww04t4Nkis6Wtg0jik2E0k-SThFPUzJBGpQ"
Ezzel a kapott tokennel már tudom azonosítani magamat (Józsi 10 p körül globális változón kersztül menti el, nekem így is sikerült kimásolnom):

fetch('http://localhost:3000/person', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTY1NDM4NDU5NX0.h60NorG7ww04t4Nkis6Wtg0jik2E0k-SThFPUzJBGpQ'
  }
}).then(r => r.json())
  .then(d => console.log(d));

és ezzel már megkaptam a lekért person adatokat (gondolom, máskor bejelentkezve majd másik token-t kapok)
a /post-elérése még nem megy, mert ahhoz azt adtuk meg a server.js-ben(adminOnly!), hogy az eléréshez be kellene loginolni az adminnal is:

fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'admin', password: 'admin_pw'})
}).then( r => r.json() )
.then( d => console.log(d) );

és a kapott accessTokennel le tudok kérdezni konkrét post-ot (mert eddig csak arra írtuk meg a controllert):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0Mzg1OTc5fQ.g4vZeyOOcYZHAIUiScCSlASLf4kFgPs_62XhcmiwYTY

fetch('http://localhost:3000/post/629b5883429997b37ffc87c6', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0Mzg1OTc5fQ.g4vZeyOOcYZHAIUiScCSlASLf4kFgPs_62XhcmiwYTY'
  }
}).then(r => r.json())
  .then(d => console.log(d));

Közben kiegészítettem a findAll-lal a person alapján a post-ot is  a service-controller-router fájljaiban, így már az összeset is le tudom kérdezni admin-bejelentkezéskor kapotttokennel:
fetch('http://localhost:3000/post', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0Mzg1OTc5fQ.g4vZeyOOcYZHAIUiScCSlASLf4kFgPs_62XhcmiwYTY'
  }
}).then(r => r.json())
  .then(d => console.log(d));

*/
