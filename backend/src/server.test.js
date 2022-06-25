const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const logger = require('./config/logger');
// const seeder = require('./seeds/seeders');
// const {response} = require('jest-mock-req-res');
const librarianModel = require('./model/librarian.model');

// const Product = require('./model/product');
// const { response } = require('jest-mock-req-res');
// const { Test } = require('supertest');

describe('REST API integration tests', () => {
    const insertData = [{
        name: "Test Elek",
        username: "editor",
        location: 10,
        role: 3,
        phone: 999,
        active: false,
    }];

    beforeEach(done => {
        const {host, user, pass } = config.get('database');
        mongoose.connect(`mongodb+srv://${host}`, {
            user,
            pass,
        }).then(conn => {
            logger.info('Connection success!');
            done();
        })
            .catch(err => {
                throw new Error(err.message);
            });
    });

    afterEach(done => {

        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done());
            logger.info('Connection closed!');
        });

    });

    test("GET /librarian/:id", () => {
        let firstPostId;
        return librarianModel.insertMany(insertData)
            .then(librarians => {
                firstPostId = librarians[0]._id;
                return supertest(app).get(`/librarian/${firstPostId.toString()}`).expect(200);
            })
            .then(response => {
                // Check data
                expect(response.body._id).toBe(firstPostId.toString());
                expect(response.body.name).toBe(insertData[0].name);
                expect(response.body.username).toBe(insertData[0].username);
                librarianModel.findByIdAndRemove(firstPostId).then(r => logger.info('Original state restored!'));
            });
    });

    test('GET /book', done => {
        supertest(app).get('/book').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(100);
                done();
            });
    });
    test('GET /borrow', done => {
        supertest(app).get('/borrow').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(50);
                done();
            });
    });
    test('GET /librarian', done => {
        supertest(app).get('/librarian').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(10);
                done();
            });
    });
    test('GET /member', done => {
        supertest(app).get('/member').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(100);
                done();
            });
    });
    test('GET /user', done => {
        supertest(app).get('/user').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(10);
                done();
            });
    });
});
