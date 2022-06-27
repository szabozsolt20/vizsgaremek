## **1. Az alkalmazás célja**

- Az alkalmazás feladata, hogy a egy könyvtár alapadatai nyilvántartásán keresztül demonstrálja az alapvető CRUD megvalósítási lehetőségeket egyszerű webszolgáltások esetén a képzésen elsajátított panelekből építkező megoldások segítségével

## **2. Az alkalmazás telepítése**

- Forkolni kell a következő GitHub repository tartalmát: [https://github.com/szabozsolt20/vizsgaremek](https://github.com/szabozsolt20/vizsgaremek)   
- A célgép egy mappájába le kell klónozni az adott GitHub repository tartalmát:
>git clone https://github.com/szabozsolt20/vizsgaremek

- Telepíteni kell az alkalmazás függőségeit:
  - Be kell lépni a vizsgaremek /backend és /frontend mappáiba, és ki kell adni az npm i parancsot:
  >cd vizsgaremek/backend
  >npm i
  >cd ../backend
  >npm i

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal  
- A frontend mappa termináljában ki kell adni az `ng build` parancsot   
- A _/frontend/dist/frontend_ mappa tartalmát be kell másolni a _/backend/public_ mappába   
- A terminálon be kell lépni a /backend mappába és futtatni az `npm run build` parancsot 

## **3. Az alkalmazás konfigurálása**

A /frontend/environments mappában át lehet állítani az API-végpont jelenlegi elérési útvonalát:
  - _environment.ts_ állomány: http://127.0.0.1:3000/  
  - _environment.prod.ts_ állomány: http://localhost:3000/ 

## **4. Az alkalmazás indítása**

Lehetőség van Docker konténeres használatra is:
A konfigurált Docker container indítása és inicializálása:
- El kell indítani a Docker Desktop alkalmazást
- A /backend mappába belépve a terminálban ki kell adni az `npm run deploy` parancsot  

_Megjegyzés_:  
A belépéshez egy érvényes e-mail-cím és jelszó páros (példa):  

E-mail | Jelszó
------------ | -------------
test@test.test | 123456

## **5. A végpontok dokumentációja**

- Az alábbi URL-t kell beírni a böngészőbe: https://localhost:3000/api-docs

---
---

## **Linkek:**  

- [Felhasználói történet](https://github.com/szabozsolt20/vizsgaremek/blob/main/README.md)
- [API dokumentáció](https://localhost:3000/api-docs)




