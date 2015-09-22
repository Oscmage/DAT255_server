/**
 * Placeholder method that only sends the text 'hello' as a response.
 *
 * @param req The request object.
 * @param res The response object.
 * @param next The next method in the call chain.
 */
exports.index = function (req, res, next) {
    res.status(200);
    next();
};