/**
 * Placeholder method that only sends the text 'hello' as a response.
 */
exports.index = function (req, res, next) {
    res.send('hello!');
    next();
};