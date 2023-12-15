# Lukittu leffa

## Lukittu leffa on nettisivu elokuvien, elokuvauutisten selaamista ja arvostelua varten.
### Sisällysluettelo
- Projektista	
- Tekniset tiedot	
- Käytetyt teknologiat
- ER-kaavio ja nettisivun luuranko
- ER-kaavio
- Nettisivun luuranko
- Käyttöönotto
- käyttöliittymän käynnistäminen
- taustajärjestelmän käynnistäminen



# <a name="_toc153550527"></a>Projektista
Ryhmä 8:n projektissa työskentelivät: Hannu Oikarinen; rajapinnat ja testaus, Elias Piekkola; käyttöliittymä, Miika Puominen; käyttöliittymä, Sakari Snellman; tietokanta.

Nettisivulla voi tehdä seuraavia asioita:

- hakea elokuvia
- lisätä elokuviin arvosteluja
- selata arvosteluja
- tallentaa elokuvia omalle toivelistalle
- saada elokuvaehdotuksia katsomiesi elokuvien perusteella
- nähdä oman elokuvahistorian
- luoda tai poistaa ryhmä
- hallinnoida oman ryhmän jäseniä
- liittyä ryhmiin
- keskustella muiden ryhmän jäsenten kanssa
- nähdä Finnkinon tulevat näytökset sekä uutiset
# <a name="_toc153550528"></a>Tekniset tiedot
## <a name="_toc153550529"></a>Käytetyt teknologiat
Ohjelman arkkitehtuuri on React/Nodejs/Postgre, joka käyttää seuraavia kieliä: CSS, JavaScript ja SQL. Tietokanta on isännöity Render ympäristössä (huom. tietokanta vanhenee 4.2.2024), ja käyttää The movie database sekä Finnkino rajapintoja. [Linkki Postman dokumentaatioon](https://documenter.getpostman.com/view/26353360/2s9YkkfNv3). Mocha & Chai testitulokset löytyvät erillisestä dokumentista GitHub hakemistossa, Documentation-kansiosta nimellä: MochaChai\_Raportti.docx.

Ohjelma vaatii seuraavat riippuvuudet ja kirjastot:

- Bcrypt
- cors
- dotenv
- express
- fetch-mock
- sinon
- multer
- node-fetch
- nodemon
- pg
- chai
- chai-as-promised
- mocha
- sinon
- xml2js
- testinglibrary
- bootstrap
- react
- react-router-dom
- web-vitals

## ER-kaavio ja nettisivun luuranko
###  ER-kaavio

![image](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/13feea2a-78d8-4b68-acbf-9906b9335a76)

Kuva 1: ER-Kaavio

###  Nettisivun luuranko


![mockup_frontpage](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/903cdff4-4bb0-478f-b017-a6923f9b5ec5)


Kuva 2: Etusivun luuranko


![mockup_loginpopup](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/75b22c1b-cdfc-48ce-a188-65f21453189e)


Kuva 3: sisäänkirjautumissivun luuranko


![mockup_moviespage](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/b8e59b77-1d92-40f8-8a1a-cac0cde2b470)


Kuva 4: Elokuvasivun luuranko 


![mockup_userpage](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/ada143e9-283e-4483-a2b2-3d95d6da1583)


Kuva 5: käyttäjäsivun luuranko


![mockup_groupbrowsing](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/15308b8e-e407-448e-bf4b-f4e5f4ba42d0)

Kuva 6: Ryhmien selaussivun luuranko

![mockup_grouppage](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/3174c55a-4420-4a7a-bcc6-c0b3d36ff49b)

Kuva 7: ryhmänäkymäsivun luuranko


# Käyttöönotto
Tällä hetkellä nettisivua ei ole kasattu kokoon tai isännöity missään, mutta projektin voi katselmoida selaimessa käynnistämällä käyttöliittymän ja taustajärjestelmän erillisistä terminaaleista. Käyttöönotto vaatii, että kaikki riippuvuudet ja kirjastot, ks. Käytetyt teknologiat s. 2, ovat asennettuna. Tämä onnistuu komennolla ”npm install” .\lukittuleffa\ kansiossa. Ohjeet olettavat, että terminaali on avattu oikeassa hakemistossa ”C: \...\lukittuleffa\”. Käynnistämäisen jälkeen nettisivu on näkyvissä selaimessa osoitteessa ”http://localhost:3000”
## <a name="_toc153550534"></a>käyttöliittymän käynnistäminen
Avaa terminaali ja siirry ensin oikeaan hakemistoon komennolla ”cd . \frontend\”. Käyttöliittymä käynnistyy komennolla ”npm start”(Kuva 8.).
![image](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/b5c549c8-777c-4256-8f3b-8a7468b08a82)

Kuva 8: Käyttöliittymän käynnistys.


![image](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/758e26a8-2f0a-4542-86e8-920d3aa32c03)


Kuva 9: Käyttöliittymä käynnistynyt onnistuneesti.
## taustajärjestelmän käynnistäminen 
Avaa uusi terminaali ja siirry oikeaan hakemistoon komennolla ”cd . \lukittunode\src\”. Käyttöliittymä käynnistyy komennolla ”node main” tai ”node .\main.js”(Kuva: 10).
![image](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/efe3e984-7c2c-43d9-b4e0-fb7421975fd8)


Kuva 10: Taustajärjestelmän käynnistys.


![image](https://github.com/TVT22-8/LukittuLeffa/assets/127741434/484f043e-8115-410e-bf1d-09b320f1b403)


Kuva 11: Taustajärjestelmä käynnistynyt onnistuneesti.
