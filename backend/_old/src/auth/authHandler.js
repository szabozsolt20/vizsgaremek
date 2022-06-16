const jwt = require('jsonwebtoken');
const userService = require('../controllers/librarian/librarian.service');

let Users = [];
(async () => Users = await userService.find())(); // letöltöm Users[]-be a MongoDB-s users kollekciót



const refreshTokens = []; // kiküldött és érvényben lévő frissítő tokenek részére

module.exports.login = (req, res) => { // '/login'-ra küldött POST esetén használjuk.
  // amodule.exports = (req, res)  helyett: module.exports.login..., hogy ne írjam felül az itteni teljes module.exports-t
  const { username, password } = req.body;

  const user = Users.find(
    u => u.username === username && u.password === password
  );

  if (user) {  // token generálás
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY // 60 percenként lejárjon
    });

    const refreshToken = jwt.sign({ // Az aktuálissal egy frissítő tokent is küldünk vissza, csak ezt a REFRESH_TOKEN_SECRET-vel írva alá. Ennek nem lesz lejárati ideje.
      username: user.username,
      role: user.role
    }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken); // elmentjük egy tömbbe a frissítő token-t.

    res.json({
      accessToken,
      refreshToken  // tehát ezt is visszaküldjük, hogy lejárt előtt tudjon új tokent kérni
    });
  } else {
    res.json('Username or password incorrect.'); // res.send()-del nem írja ki a kliens konzolja
  }

};


module.exports.refresh = (req, res, next) => { // '/login'-ra küldött POST esetén használjuk. Ez felel majd azért, hogy új tokent lehessen kérni, ha lejárt a régi
  const { token } = req.body; // kiolvassuk a firssítési kérelemhez küldött refresh tokent

  if (!token) {
    return res.sendStatus(401); // kellenek a retun-ök, hogy szálljon ki a metódusból, ne menjen tovább, ha hiba volt
  }

  if (!refreshTokens.includes(token)) { // ellenőrízzük, és, ha nincs az általunk már kiküldött frissítő tokenek között:
    // console.log(refreshTokens, token); //csak debughoz kellett Józsinak
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => { // ha rendben volt a frissítő token (szerintem ez az ellenőrzés felesleges,
    // hisz az imént ellenőríztem, és benne volt az ezzel a kulccsal aláírtakat tartalmazó tömbben. De a user kinyerése miatt kell. Inkább az előző a felesleges.)
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign({ // ha ok, rendben volt a frissítő token, akkor előállítok egy új tokent, és azt küldjük vissza
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY
    });

    res.json({
      accessToken
    });
  });
};

module.exports.logout = (req, res) => { // kijelenkezés. a /logout-ra küldött refreshTokens-es kéréssel jutok ide
  const { token } = req.body; // csak egy tokent küldök a body-ban POST-tal(?) (ez azonosítja is, hogy kit szeretnék kijelentkeztetni)

  if (!refreshTokens.includes(token)) {
    res.sendStatus(403);
  }

  const tokenIndex = refreshTokens.indexOf(token); //	ha ok, akkor eltávolítjuk ezt a tokent, tehát csak újra loginolhat, mert frissíteni már nem fog tudni ezzel a tokennel
  refreshTokens.splice(tokenIndex, 1);

  res.sendStatus(200);
};


/* 
•	Próba, loginolok:

fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: 'admin', password: 'admin_pw'})
}).then( r => r.json() )
.then( d => console.log(d) );

•	Visszakapom a két tokent ( a 33-36.sor szerint):
accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0OTg1MjgzLCJleHAiOjE2NTUwMjEyODN9.ZCSYBp-ufwDMr-n0JQn2hyl3umZJFliPOhNWQI1xgW8"
refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0OTg1MjgzfQ.hlQ_A4Leejh9RCj8b7ZCsDnSToSx5ZtqQQwZIShfP1g"

(videóban elmenti at, és rt globáéis változóban jklikk rajtuk)

•	ezzel a tokennel probalekérések (/post-ra is megy):
fetch('http://localhost:3000/person/vaccinated', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0OTg1MjgzLCJleHAiOjE2NTUwMjEyODN9.ZCSYBp-ufwDMr-n0JQn2hyl3umZJFliPOhNWQI1xgW8'
  }
}).then(r => r.json())
  .then(d => console.log(d));

•	 lefut rendben, és person eredményeket ad vissza
•	Most a token frissítés-kérést teszteljük (videóban 4:45-től debug-szenvedés 8:10- és 9:40-ig) a kapott refreshToken-nel(az itt szereplő formában):

fetch('http://localhost:3000/refresh', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0OTg1MjgzLCJleHAiOjE2NTUwMjEyODN9.ZCSYBp-ufwDMr-n0JQn2hyl3umZJFliPOhNWQI1xgW8'})
}).then( r => r.json() )
.then( d => console.log(d) );

meg is kapok egy új accessToken-t:
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NDQ1NzEwLCJleHAiOjE2NTQ0NDkzMTB9.-JKEzqsPz5Ns50nlWc_IJpKV1yQaNA5uBi7nn5iOYPA'

Kipróbáljuk a logout-ot is (hasonló kérés a refreshToken-nal a body-ban, mint a refresh esetében):
fetch('http://localhost:3000/logout', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0OTg1MjgzLCJleHAiOjE2NTUwMjEyODN9.ZCSYBp-ufwDMr-n0JQn2hyl3umZJFliPOhNWQI1xgW8'})
}).then( d => console.log(d) );

Ekkor csak egy 200-as választ kapunk vissza(amit nem kell r.json()-olni), "kilogoltunk"

*/