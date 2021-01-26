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

describe("Users API tests", () => {

    let userCount = 0;
    let firstUserId = "";

    describe("POST /users/add", () => {
        // Test to add an user record
        it("should add one user", (done) => {
            chai.request(app)
                .post('/users/add')
                .set('Cookie', Cookies)
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                    "user": "someone",
                    "user_type": "tester"
                })
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal(true);

                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal("tester added");

                    expect(res.body).to.have.property('data');
                    expect(res.body.data.affectedRows).to.equal(1);

                    done();
                });
        })
    });

    describe("GET /users/get/", () => {
        // Test to get all user record
        it("should get all users record", (done) => {
            chai.request(app)
                .get('/users/get/')
                .set('Cookie', Cookies)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal(true);

                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.not.equal(null);

                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.an.instanceof(Array);
                    userCount = Object.keys(res.body.data).length;
                    done();
                });
        })
    });


    describe("POST /users/add", () => {
        // Test to add an user record
        it("should add one user", (done) => {
            chai.request(app)
                .post('/users/add')
                .set('Cookie', Cookies)
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                    "user": "someone",
                    "user_type": "tester"
                })
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal(true);

                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal("tester added");

                    expect(res.body).to.have.property('data');
                    expect(res.body.data.affectedRows).to.equal(1);

                    done();
                });
        })
    });


    describe("GET /users/get/", () => {
        // Test to get all user record again
        it("should get all users record again", (done) => {
            chai.request(app)
                .get('/users/get/')
                .set('Cookie', Cookies)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.an.instanceof(Array);
                    firstUserId = res.body.data[0].user_id;
                    expect(userCount + 1).equal(Object.keys(res.body.data).length);
                    done();
                });
        })
    });

    describe("GET /users/get/:id", () => {
        // Test to get one user record
        it("should get one users record", (done) => {
            chai.request(app)
                .get("/users/get/" + firstUserId)
                .set('Cookie', Cookies)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal(true);

                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.not.equal(null);

                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.an.instanceof(Array);
                    expect(res.body.data).to.have.property(0).that.includes.all.keys(['user_id', 'user', 'user_type'])
                    done();
                });
        })
    });

    describe("UPDATE /users/update", () => {
        // Test to update an user record
        it("should update first user", (done) => {
            chai.request(app)
                .post('/users/update')
                .set('Cookie', Cookies)
                .send({
                    "user_id": firstUserId,
                    "user": "Johnny_1"
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal(true);

                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal("user id: " + firstUserId + " updated");

                    expect(res.body).to.have.property('data');
                    expect(res.body.data.affectedRows).to.equal(1);
                    done();
                });
        })
    });

    describe("DELETE /users/delete", () => {
        // Test to delete a user record
        it("should delete a user", (done) => {
            chai.request(app)
                .delete('/users/delete')
                .set('Cookie', Cookies)
                .send({
                    "user_id": firstUserId
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.equal(true);

                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal("user id: " + firstUserId + " deleted");

                    expect(res.body).to.have.property('data');
                    expect(res.body.data.affectedRows).to.equal(1);
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