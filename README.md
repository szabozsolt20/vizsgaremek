**Könyvtári Nyilvántartó - USER STORY**
===
---
### *(Fullstack G_HGK vizsgaremek)*

>A rendszer alapfeladata egy könyvtár könyveinek, könyvtárosainak, könyvtártagjainak, illetve a kölcsönzéseinek, és ezek nyilvántartási lehetőségeinek megvalósításán keresztül demonstrálni alapvető CRUD megvalósításokat egyszerű webszolgáltások esetén a képzésen elsajátított panelekből építkező megoldások segítségével. Jelen leírás az ehhez készített adminisztrációs felület  ***USER STORY***-ját  tartalmazza.

___
# 1. Bejelentkező ablak: Autentikáció ((Fő)könyvtáros, mint adminisztrátor belépéséhez)
### Felhasználói történet:
> _Bejelentkezési lehetőség egyes admin felületek eléréséhez._

#### Elfogadási kritérium:
Ahhoz, hogy eljussunk az adminisztrációs felületekre, be kell jelentkezni (létező user email/pw adatokkal). Ez  bejelentkező ablakban történő felhasználónév és a jelszó megadásával lehetséges, de egyes oldalak eléréshez megkerülhető.

___
# 2. Főoldal - feladatválasztás
### Felhasználói történet:
> _Az adminisztrációs feladat célhalmazának kiválasztása._

#### Elfogadási kritérium:
 Belépést követően(ha szükséges) a főablak fogad bennünket üdvözlő/információs szöveggel elláltott rendszer megnevezéssel. A lap oldalsávi főmenükből választhatunk a kívánt adminisztrációs feladatok közül:
 - Home
 - Books
 - Borrows
 - Librarians
 - Members
 - Users
___
# 3. Aloldalak

## **Közös jellemzők:**
 ### 1. Felhasználói történet:
> _Az egyes aloldalakon listázva láthatjuk az adminisztrálni kívánt csoport tételeit._

#### Elfogadási kritérium:
A táblázatosan megjelenített tételek listái a jellemzőik alapján jeleníthetők meg. Innen érhető el új tételek felvitele, törlési, és szerkesztési lehetősége. (Szerkesztésre egyes megjelenített jellemzők (pl. id, kölcsönzési idő...) nem elérhetők.)

 ### 2. Felhasználói történet:
> _Az egyes aloldalakon a tételsorok végi gomb segítségével meglévő minta alapján új tételt rögzíthetünk (klónozott, vagy tetszőlegesen módosított adatokkal)._

#### Elfogadási kritérium:
A szerkesztési lehetőséggel kombinált gomb megnyomására az adott tétel jellemzőit egyedileg megjelenítő lapra navigálunk, ahol lehetőségünk van az adatokat validáltan feltölteni/módosítani, majd a tételt elmenteni, aminek sikeréről felugró ablak tájékoztat. A módosítást követően visszajutunk az immár frissített adatokat tartalmazó aloldalra.

 ### 3. Felhasználói történet:
> _Az egyes aloldalakon listázott tételek szerkeszthetők a tétel végén látható gombok segítségével._

#### Elfogadási kritérium:
A sorvégi kombinált gomb megnyomására az adott tételt egyedileg megjelenítő lapra navigálunk, ahol lehetőségünk van a szerkeszthető adatokat validáltan módosítani, majd a módosításokat elmenteni, aminek sikeréről felugró ablak tájékoztat. A módosítást követően visszajutunk az immár frissített adatokat tartalmazó aloldalra.

 ### 4. Felhasználói történet:
> _Az egyes aloldalakon listázott tételek törölhetők a tétel végén látható gombok segítségével._

#### Elfogadási kritérium:
A sorvégi piros gomb megynomására lehetőségünk lesz az adott tétel eltávolítására. A törlést követően visszajutunk az immár frissített adatokat tartalmazó aloldalra.

***

## **Egyedi aloldalak:**
 - ## Books - Állomány alapadatai (CRUD) aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a teljes könyvtári állományt._

#### Elfogadási kritérium:
Táblázatos formában jelennek meg a teljes könyvtári állomány tulajdonságai, ezek minden egyes tétele szerkeszthető, törölhető, és új tétel vihető fel a sorvégi gombok segítségével.
- Látható, és szerkesztésre elérhető tulajdonságok:
  - Azonosító (nem szerkeszthető) 
  - ISBN szám 
  - Szerző
  - Cím
  - Kiadó
  - Év
  - Műfaj
  - Helye a katalógusban
  - Aktív

  ---
 - ## Librarians - Könyvtárosok alapadatai (CRUD) aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a könyvtári dolgozók alapadatait+._

#### Elfogadási kritérium:
Táblázatos formában jelenik meg a könyvtári dolgozók tulajdonságai, amelynek minden egyes tétele szerkeszthető, törölhető, és új tétel vihető fel a sorvégi gombok segítségével.
- Látható, és szerkesztésre elérhető tulajdonságok:
  - Azonosító (nem szerkeszthető) 
  - Név
  - Felhasználói név(későbbi fejlesztési lehetőség jogosultság jelzésére)
  - Szoba
  - Jogosultsági szint (User name-től függetlenül módosatható)
  - Telefon mellék
  - Aktív
  
---
  - ## Members - Kölcsönzők alapadatai (CRUD) aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a beiratkozott felhasználók(kölcsönzők) állományát._

#### Elfogadási kritérium:
Táblázatos formában jelenik meg a teljes felhasználói kör(beiratkozott kölcsönzők) tulajdonságai, amelynek minden egyes tétele szerkeszthető, törölhető, és új tétel vihető fel a sorvégi gombok segítségével.
- Látható, és szerkesztésre elérhető tulajdonságok:
  - Azonosító (nem szerkeszthető) 
  - Név 
  - Belső könyvtári azonosító 
  - Anyja neve
  - Születési hely 
  - Születési idő
  - Lakcím
  - Email (nem kötelező)
  - Telefonszám (nem kötelező)
  - Aktív

  --- 
 - ## Borrows - Kölcsönzések aloldal
 ### Felhasználói történet:
> _Az oldalon listázva láthatjuk a kölcsönzések jellemzőit._

#### Elfogadási kritérium:
Táblázatos formában jelennek meg a kölcsönzések tulajdonságai, amelynek minden egyes tétele szerkeszthető, törölhető, és új tétel vihető fel a sorvégi gombok segítségével.

- Megjelenített tulajdonságok:
  - Azonosító (nem szerkeszthető) 
  - Kölcsönzés időpontja
  - Kölcsönző neve
  - Kölcsönzött tétel(ek) szerzője:címe
  - Aktív

***
***
## _A projekt egyéb adatai:_

**Prioritás:**  
magas

**Megvalósítás időtartama:**  
rövid

**További fejlesztési lehetőségek:**  
A projekt hosszabbtávú célkitűzése a hiánytalan, és tökéletes megvalósítás. - a jövőbeni az adott körülmények melletti melletti hiányosabb megvalósítások továbbfejlesztéssel.😊 Ilyen irányok lehetnek:
 - kisebb lépésekben a beágyazottsági szintek összetettségének növelésével rugalmasabb adatelérési, és CRUD lehetőségek biztosítása,
 - funkcióbővítés az életszerű üzleti logika megvalósítás irányában,
 - bővebb jogosultsági szintek megvalósítása
 - keresési és rendezési lehetőséggel bővítés
 - kölcsönzői (members) funkciók megvalósítása
 - dizájn 

---
## Témához kapcsolódó linkek
[Alkalmazás dokumentációja](https://github.com/szabozsolt20/vizsgaremek/blob/main/DOCUMENTATION.md)

[API dokumentáció](https://localhost:3000/api-docs)

[Útmutató a könyvtárosi munkához](http://www.somogykszr.hu/userfiles/dokumentumok/KSZR_utmutato.pdf)

[Országos Könyvtári Platform](http://www.oszk.hu/sites/default/files/OKP_K%C3%B6vetelm%C3%A9nyjegyz%C3%A9k.pdf)

[A projekt folytatásának tervezett helye](https://github.com/szabozsolt20/Library-borrow-registration-system)
