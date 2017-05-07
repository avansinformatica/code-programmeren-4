//
// Tests voor versie 2 van de API.
//
// Referentie: zie http://chaijs.com/api/bdd/#members-section
//
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('Hello API version 2', function(){
    it('should return a simple text on GET /api/v2/hello', function(done){
		chai.request(server)
			.get('/api/v2/hello')
			.end( function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('message');
				res.body.message.should.equal('Hello World Versie Twee!')
				done();
			});
	});
    it('should return a simple text on GET /api/v2/goodbye', function(done){
		chai.request(server)
			.get('/api/v2/goodbye')
			.end( function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('tekst');
				res.body.tekst.should.equal('Goodbye Versie 2!')
				done();
			});
	});
});