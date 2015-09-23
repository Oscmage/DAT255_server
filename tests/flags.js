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

        it('should respond with status code 400 and the message "Bad request, flagType must be an integer" when flagType is null', function (done) {
            client.post('/flags', { flagType: null }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, flagType must be an integer');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, flagType must be an integer" when flagType is a string', function (done) {
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

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType is valid and comment is null', function (done) {
            client.post('/flags', { flagType: 2, comment: null }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType is valid and comment is an integer', function (done) {
            client.post('/flags', { flagType: 2, comment: 123 }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType is valid and comment is a boolean', function (done) {
            client.post('/flags', { flagType: 2, comment: true }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType is valid and comment is an array', function (done) {
            client.post('/flags', { flagType: 2, comment: [] }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be a string" when flagType is valid and comment is an object', function (done) {
            client.post('/flags', { flagType: 2, comment: { foo: 'bar' } }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be a string');
                done();
            });
        });

        it('should respond with status code 400 and the message "Bad request, comment must be more than 5 characters" when flagType = 1 and comment is an empty string', function (done) {
            client.post('/flags', { flagType: 1, comment: '' }, function (err, req, res, payload) {
                assert.equal(400, res.statusCode);
                assert.propertyVal(payload, 'errorMessage', 'Bad request, comment must be more than 5 characters');
                done();
            });
        });

        it('should respond with status code 200 when flagType is valid and not 1, and comment is an empty string', function (done) {
            client.post('/flags', { flagType: 2, comment: '' }, function (err, req, res, payload) {
                assert.equal(200, res.statusCode);
                assert.notProperty(payload, 'errorMessage');
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

        it('should respond with status code 200 when flagType exists and is not 1, and comment is absent', function (done) {
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