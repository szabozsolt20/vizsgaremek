**Könyvtári Nyilvántartó - USER STORY**
===
---
### *(Fullstack G_HGK vizsgaremek)*

>A rendszer alapfeladata egy könyvtár könyveinek, könyvtárosainak, könyvtártagjainak, illetve a kölcsönzéseinek  nyilvántartása. Jelen leírás az ehhez szükséges adminisztrációs rendszer  ***USER STORY***-ját  tartalmazza.

___
# 1. Bejelentkező ablak: Autentikáció ((Fő)könyvtáros, mint adminisztrátor belépéséhez)
### Felhasználói történet:
> _Bejelentkezési lehetőség az admin felületek eléréséhez._

#### Elfogadási kritérium:
Ahhoz, hogy eljussunk az adminisztrációs felületekre, be kell jelentkezni. Ez  bejelentkező ablakban történő felhasználónév és a jelszó megadásával lehetséges.

___
# 2. Főoldal - feladatválasztás
### Felhasználói történet:
> _Az adminisztrációs feladat célhalmazának kiválasztása._

#### Elfogadási kritérium:
 Belépést követően a főablak fogad bennünket üdvözlő szöveggel elláltott rendszer megnevezéssel. A lap fejlécében főmenükből választhatunk a kívánt adminisztrációs feladatok közül:
 - Állomány alapadatai (CRUD)
 - Könyvtárosok alapadatai (CRUD)
 - Kölcsönzők alapadatai (CRUD)
 - Kölcsönzések
 - Események
___
# 3. Aloldalak

## **Közös jellemzők:**
 ### 1. Felhasználói történet:
> _Az egyes aloldalakon listázva láthatjuk az adminisztrálni kívánt csoport tételeit._

#### Elfogadási kritérium:
A táblázatosan megjelenített tételek listái a jellemzőik alapján szűrhető és/vagy rendezhető formában jeleníthetők meg. Innen érhető el új tételek felvitele, törlési, és szerkesztési lehetősége. (Szerkesztésre egyes megjelenített jellemzők (pl. id, kölcsönzési idő...) nem elérhetők.)

 ### 2. Felhasználói történet:
> _Az egyes aloldalak tetején gomb segítségével új tételt rögzíthetünk._

#### Elfogadási kritérium:
A gomb megnyomására az adott tétel jellemzőit egyedileg megjelenítő lapra navigálunk, ahol lehetőségünk van az adatokat validáltan feltölteni, majd a tételt elfogadni, vagy elvetni. A módosítást követően visszajutunk az immár frissített adatokat tartalmazó aloldalra.

 ### 3. Felhasználói történet:
> _Az egyes aloldalakon listázott tételek szerkeszthetők a tétel végén látható gombok segítségével._

#### Elfogadási kritérium:
A gomb megnyomására az adott tételt egyedileg megjelenítő lapra navigálunk, ahol lehetőségünk van a szerkeszthető adatokat validáltan módosítani, majd a módosításokat elfogadni, vagy elvetni. A módosítást követően visszajutunk az immár frissített adatokat tartalmazó aloldalra.

 ### 4. Felhasználói történet:
> _Az egyes aloldalakon listázott tételek törölhetők a tétel végén látható gombok segítségével._

#### Elfogadási kritérium:
A gomb megynomására megerősítő kérdést követően lehetőségünk lesz az adott tétel eltávolítására. A törlést követően visszajutunk az immár frissített adatokat tartalmazó aloldalra.

***

## **Egyedi aloldalak:**
 - ## Állomány alapadatai (CRUD) aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a teljes könyvtári állományt._

#### Elfogadási kritérium:
Táblázatos formában jelennek meg a teljes könyvtári állomány tulajdonságai, ezek minden egyes tétele szerkeszthető, törölhető a sorvégi gombok segítségével. A táblázat tetején új tétel vihető fel.
- Látható, és szerkesztésre elérhető tulajdonságok:
  - ISBN szám 
  - Szerző
  - Cím
  - Kiadó
  - Év
  - Műfaj
  - Kikölcsönöző
  - Helye a katalógusban
  - Aktív

  ---
 - ## Könyvtárosok alapadatai (CRUD) aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a könyvtári dolgozók alapadatait+._

#### Elfogadási kritérium:
Táblázatos formában jelenik meg a könyvtári dolgozók tulajdonságai, amelynek minden egyes tétele szerkeszthető, törölhető a sorvégi gombok segítségével. A táblázat tetején új tétel vihető fel.
- Látható, és szerkesztésre elérhető tulajdonságok:
  - Név
  - Felhasználói név(email)
  - Szoba
  - Jogosultsági szint
  - Telefon mellék
  - Aktív
  
---
  - ## Kölcsönzők alapadatai (CRUD) aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a beiratkozott felhasználók(kölcsönzők) állományát._

#### Elfogadási kritérium:
Táblázatos formában jelenik meg a teljes felhasználói kör(beiratkozott kölcsönzők) tulajdonságai, amelynek minden egyes tétele szerkeszthető, törölhető a sorvégi gombok segítségével. A táblázat tetején új tétel vihető fel.
- Látható, és szerkesztésre elérhető tulajdonságok:
  - Név 
  - Anyja neve
  - Születési hely 
  - Születési idő
  - Lakcím
  - Email (nem kötelező)
  - Telefonszám (nem kötelező)
  - Aktív

  --- 
 - ## Kölcsönzések aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a kölcsönzések jellemzőit._

#### Elfogadási kritérium:
Táblázatos formában jelennek meg a kölcsönzések tulajdonságai, amelynek minden egyes tétele törölhető, illetve későbbiekben meghatározott igény szerint "kezelhető" a sorvégi gombok segítségével. A táblázat tetején új tétel vihető fel.

- Megjelenített tulajdonságok:
  - Kölcsönzött tétel címe/neve
  - Kölcsönző neve
  - Kölcsönzés időpontja
  - Lejárat időpontja
  - Adatrögzítő könyvtáros
  - Aktív

 - ## Események aloldal
 ### Felhasználói történet:
> _Az oldalon nyomon követhető a könyvtári működés minden adminisztrációs eseménye._

#### Elfogadási kritérium:
A rendszer minden adatmanipulációs adminisztratív eseményt logol. Az oldalt megnyitva ezen események jelennek meg a többi aloldalhoz hasonló táblázatos formában. Ezek a tételek nem szerkeszthetők, és nem törölhetők. 

***
***
## _A projekt egyéb adatai:_

**Prioritás:**  
magas

**Megvalósítás időtartama:**  
rövid

**További fejlesztési lehetőségek:**  
A projekt célkitűzése az adott körülmények melletti hiánytalan, és tökéletes megvalósítás. 😊

---
## Témához kapcsolódó linkek
[Útmutató a könyvtárosi munkához](http://www.somogykszr.hu/userfiles/dokumentumok/KSZR_utmutato.pdf)

[Országos Könyvtári Platform](http://www.oszk.hu/sites/default/files/OKP_K%C3%B6vetelm%C3%A9nyjegyz%C3%A9k.pdf)