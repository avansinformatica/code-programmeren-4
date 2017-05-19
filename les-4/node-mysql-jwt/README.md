# node-msql
Nodejs server, biedt API op de Sakila database.

## Vooraf
- MySql of MariaDB installeren
- MySql [Sakila database](https://dev.mysql.com/doc/index-other.html) downloaden en importeren

## Gebruik
Vanaf command line:
```
npm install
npm start
```
De server runt op [localhost:3000](http://localhost:3000).

## API Endpoints
- [localhost:3000/api/v1/actors](http://localhost:3000/api/v1/actors)
- [localhost:3000/api/v1/actors/23](http://localhost:3000/api/v1/actors/23)
- [localhost:3000/api/v1/search?type=actor](http://localhost:3000/api/v1/search?type=actor)
- [localhost:3000/api/v1/search?type=actor&key=first_name&value=ED](http://localhost:3000/api/v1/search?type=actor&key=first_name&value=ED)

## Authenticatie met JSON WebTokens (JWT)
Met `express-jwt` zijn de routes beveiligd. Je wilt tenslotte niet dat zomaar iedereen informatie aan jouw gegevens (lees: de database) kan toevoegen. 

Er is een onbeveiligde `POST /api/v1/login` endpoint. Hier stuur je met Postman een json object met userinfo naar toe.
> Let op: in Postman moet je aangeven dat je je tekst via `application/json` meestuurt, niet als `text`!

```
{
    "first_name": "test",
    "last_name": "test"
}
```

Wanneer je nu de andere API endpoints wilt gebruiken moet je het token meesturen dat je van de login endpoint hebt ontvangen. Dat doe je in de header van de GET, PUT, POST, enz.

Je header key wordt 'Authorization', de value wordt 'Bearer ', met daarachter het token.