// Import the dependencies for testing
const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

let Cookies;

describe("Test login", () => {
    describe("Should not allow to access API", () => {
        it("Unlogined user access", (done) => {
            chai.request(app)
                .get('/redis/greeting')
                .end((err, res) => {
                    console.log(res.text);
                    res.should.have.status(200);
                    res.text.should.equals('only /login is allowed');
                    done();
                });
        })
    });

    describe("Do login", () => {
        it("login", (done) => {
            chai.request(app)
                .post('/login')
                .send({
                    "username": "admin",
                    "password": "admin",
                })
                .end((err, res) => {
                    console.log(res.text);
                    res.should.have.status(200);
                    res.text.should.equals('Hello admin');
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
        })
    });

    describe("Should allow to access API", () => {
        it("logined user access", (done) => {
            chai.request(app)
                .get('/redis/greeting')
                .set('Cookie', Cookies)
                .end((err, res) => {
                    console.log(res.text);
                    res.should.have.status(200);
                    res.text.should.equals('Hello redis storage');
                    done();
                });
        })
    });
});

describe("Redis API tests", () => {

    let testRedisKey = "testKey";
    let testRedisValue = "testValue";

    describe("REDIS ADDKEY /redis/storage", () => {
        it("should add a redis key", (done) => {
            chai.request(app)
                .post('/redis/storage/' + testRedisKey)
                .set('Cookie', Cookies)
                .send({
                    "data": testRedisValue
                })
                .end((err, res) => {
                    console.log(res.text);
                    res.should.have.status(200);
                    res.text.should.equals('Success');
                    done();
                });
        })
    });

    describe("REDIS GETKEY /redis/storage/", () => {
        it("should get a redis key", (done) => {
            chai.request(app)
                .get('/redis/storage/' + testRedisKey)
                .set('Cookie', Cookies)
                .end((err, res) => {
                    console.log(res.text);
                    res.should.have.status(200);
                    res.text.should.contains(testRedisValue);
                    done();
                });
        })
    });
});