/**
 *  This module handles post-request for "/flags".
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
    } else if (!(LOWEST_FLAG_NUMBER <= flagType  && flagType <= LARGEST_FLAG_NUMBER)) {
        res.send(400,
            {'errorMessage': 'Bad request, flagType does not exist' });
        return next();
    }

    if (flagType === 1) {
        if (comment === undefined) {
            res.send(400,
                {'errorMessage': 'Bad request, expected comment' });
            return next();
        } else if (!(typeof comment === 'string')) {
            res.send(400,
                {'errorMessage': 'Bad request, must be a string' });
            return next();
        } else if (comment.trim().length < 5) {
            res.send(400,
                {'errorMessage': 'Bad request, comment must be more than 5 characters' });
            return next();
        } else {
            res.send(200);
            return next();
            //TODO: Save the information provided.
        }
    } else {
        res.send(200);
        //TODO: Save the information provided.
    }

    next();
};