process.env.NODE_ENV = 'test';
process.env.PORT = '12345';

let Cat = require('../model/cat');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

describe('Cats', () => {
    beforeEach((done) => { //Before each test we empty the database
        Cat.remove({}, (err) => {
            done();
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET cat', _ => {
        it('it should GET all the cats', (done) => {
            chai.request(server)
                .get('/cat')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST cat without name', _ => {
        it('it should not be able to POST a cat without a name field', (done) => {
            let cat = { age: 30 };
            chai.request(server)
                .post('/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.name.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should not be able to POST a cat without an age field', (done) => {
            let cat = { name: 'Mittens' };
            chai.request(server)
                .post('/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.age.should.have.property('kind').eql('required');
                    done();
                });
        });
    });
});
