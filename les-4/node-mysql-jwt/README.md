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