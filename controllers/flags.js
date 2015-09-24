/**
 *  This function adds the flag posted.
 *  Required parameters are:
 *  - flagType - integer
 *  - (comment - String) only necessary if flagType = 1, flagType = 1 represents the "Other" category.
 *  If the parameters provided doesn't meet this requirements it will respond with a 400 status code,
 *  bad request + message regarding the issue. Otherwise it will respond with 200 status code (ok).
 *  Available flagTypes are 1-6.
 */
exports.add = function (req, res, next) {
    var LARGEST_FLAG_NUMBER = 6;
    var LOWEST_FLAG_NUMBER = 1;

    var body = req.body;
    var flagType = body.flagType;
    var comment = body.comment;

    if (flagType === undefined) {
        res.send(400, {'errorMessage':'Bad request, expected flagType'});
        return next();
    }

    flagType = parseInt(flagType);

    if (isNaN(flagType)) {
        res.send(400,
            {'errorMessage': 'Bad request, flagType must be an integer'});
        return next();
    } else if (!(LOWEST_FLAG_NUMBER <= flagType  && flagType <= LARGEST_FLAG_NUMBER)) { // TODO: Replace with database check
        res.send(400,
            {'errorMessage': 'Bad request, flagType does not exist' });
        return next();
    }

    if (comment !== undefined && typeof comment !== 'string') {
        res.send(400,
            {'errorMessage': 'Bad request, comment must be a string'});
        return next();
    }

    if (flagType === 1) {
        if (comment === undefined) {
            res.send(400,
                {'errorMessage': 'Bad request, expected comment'});
            return next();
        } else if (comment.trim().length < 5) {
            res.send(400,
                {'errorMessage': 'Bad request, comment must be more than 5 characters'});
            return next();
        }
    }

    // TODO: Save the information provided.

    res.send(200);
    next();
};