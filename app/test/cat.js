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

    describe('initial /GET', _ => {
        it('it should initially GET an array of 0 cats', (done) => {
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

    describe('POST validation & success', _ => {
        it('missing name field', (done) => {
            let cat = { age: 30 };
            chai.request(server)
                .post('/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.name.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('missing age field', (done) => {
            let cat = { name: 'Mittens' };
            chai.request(server)
                .post('/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.age.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('malformed age field', (done) => {
            let cat = { name: 'Mittens', age: "toth" };
            chai.request(server)
                .post('/cat')
                .send(cat)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.should.have.property('name');
                    res.body.name.should.be.eql('ValidationError');
                    done();
                });
        });
        it('valid insert', (done) => {
            chai.request(server)
                .post('/cat')
                .send({ name: "Initial Cat", age: 13 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Cat saved');
                });
            done();
        });
    });

    describe('Playing with GETs', _ => {
        // save some cats
        it('saved 14 valid cats', (done) => {
            for (let i = 1; i <= 14; i++) {
                chai.request(server)
                    .post('/cat')
                    .send({ name: "Successful Cat " + i, age: 2 * i })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.message.should.be.eql('Cat saved');
                    });
            }
            done();
        });
    });
    // todo test ?p= and ?n=
});
