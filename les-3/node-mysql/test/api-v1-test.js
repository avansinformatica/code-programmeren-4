//
// Tests voor versie 1 van de API.
//
// Referentie: zie http://chaijs.com/api/bdd/#members-section
//
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('Hello API version 1', function(){
	it('should return an object on GET at /api/v1/hello', function(done){
		chai.request(server)
			.get('/api/v1/hello')
			.end( function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.an('object');
				res.body.should.have.property('mijntekst').that.is.a('string');
				res.body.mijntekst.should.equal( 'Hello World!')

				res.body.should.have.property('label').that.is.a('string');
				res.body.label.should.equal( 'Nog meer tekst')

				res.body.should.have.property('mijnarray').that.is.an('array');
				res.body.mijnarray.should.be.an('array');
				res.body.mijnarray.should.have.lengthOf(3);
				res.body.mijnarray.should.not.have.length.above(4);
				res.body.mijnarray.should.have.deep.property('[0]', 'tekst');
				res.body.mijnarray.should.have.deep.property('[1]', 'nog meer tekst');
				res.body.mijnarray.should.have.deep.property('[2]', 2);

				res.body.should.have.property('mijnobject');
				res.body.mijnobject.should.be.a('object');
				res.body.mijnobject.should.have.property('mijnlabel');
				res.body.mijnobject.mijnlabel.should.equal('mijntekst');
				res.body.mijnobject.should.have.property('getal');
				res.body.mijnobject.getal.should.equal(4);

				done();
			});
	});
    it('should return a simple text on GET /api/v1/goodbye', function(done){
		chai.request(server)
			.get('/api/v1/goodbye')
			.end( function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('tekst');
				res.body.tekst.should.equal('Goodbye!')
				done();
			});
	});
});