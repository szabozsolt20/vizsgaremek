const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const logger = require('./config/logger');
const seeder = require('./seeds/seeders');

// const Product = require('./model/product');
// const { response } = require('jest-mock-req-res');
// const { Test } = require('supertest');

describe('REST API integration tests', () => {
    let testCase = 0;
    beforeEach(done => {
        const { user, pass } = config.get('database');
        mongoose.connect("mongodb+srv://fapi02-cluster.gkl3gqj.mongodb.net/JestDB?retryWrites=true&w=majority", {
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

    test('GET /book', done => {
        supertest(app).get('/product').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                done();
            });
    });
    test('GET /borrow', done => {
        supertest(app).get('/borrow').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                done();
            });
    });
    test('GET /librarian', done => {
        supertest(app).get('/librarian').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                done();
            });
    });
    test('GET /member', done => {
        supertest(app).get('/member').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                done();
            });
    });
    test('GET /user', done => {
        supertest(app).get('/user').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                done();
            });
    });
});
