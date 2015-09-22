var restify = require('restify');
var assert = require('chai').assert;

var client = restify.createJsonClient({
    url: 'http://localhost:8080'
});

describe('Flags', function () {
    describe('POST: /flags', function () {
        it('should respond with status code 400 and the message "Bad request, expected flagType" when flagType is absent', function (done) {
            client.post('/flags', {}, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, expected flagType');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, flagType must be an integer" when flagType is not an integer', function (done) {
            client.post('/flags', { flagType: null }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, flagType must be an integer');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, flagType must be an integer" when flagType is not an integer', function (done) {
            client.post('/flags', { flagType: 'abc' }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, flagType must be an integer');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, flagType does not exist" when flagType is an integer, but the flagType does not exist', function (done) {
            client.post('/flags', { flagType: 152134 }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, flagType does not exist');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, expected comment" when flagType = 1 and comment is absent', function (done) {
            client.post('/flags', { flagType: 1 }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, expected comment');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType = 1 and comment is not a string', function (done) {
            client.post('/flags', { flagType: 1, comment: null }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType = 1 and comment is not a string', function (done) {
            client.post('/flags', { flagType: 1, comment: 123 }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType = 1 and comment is not a string', function (done) {
            client.post('/flags', { flagType: 1, comment: true }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType = 1 and comment is not a string', function (done) {
            client.post('/flags', { flagType: 1, comment: [] }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType = 1 and comment is not a string', function (done) {
            client.post('/flags', { flagType: 1, comment: { foo: 'bar' } }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be more than 5 characters" when flagType = 1 and comment is a string shorter than 5 characters', function (done) {
            client.post('/flags', { flagType: 1, comment: '' }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be more than 5 characters');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be more than 5 characters" when flagType = 1 and comment is a string shorter than 5 characters', function (done) {
            client.post('/flags', { flagType: 1, comment: '1234' }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be more than 5 characters');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be more than 5 characters" when flagType = 1 and comment is a string shorter than 5 characters', function (done) {
            client.post('/flags', { flagType: 1, comment: 'abcd' }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be more than 5 characters');
                done();
            });
        });

        it('should respond with status code 200 when flagType exists', function (done) {
            client.post('/flags', { flagType: 2 }, function (err, req, res, payload) {
                assert.equal(200, res.statusCode);
                assert.notProperty(payload, 'errorMessage');
                done();
            });
        });

        it('should respond with status code 200 when flagType = 1 and comment is a string with at least 5 characters', function (done) {
            client.post('/flags', { flagType: 1, comment: 'abcde' }, function (err, req, res, payload) {
                assert.equal(200, res.statusCode);
                assert.notProperty(payload, 'errorMessage');
                done();
            });
        });
    });
});