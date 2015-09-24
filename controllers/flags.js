/**
 * This function adds the flag posted. It responds with status code 200 (OK) if the request is correct, otherwise
 * it responds with status code 400 (Bad Request) and a JSON object explaining what's wrong.
 *
 * ## Request:
 * {
 *   flagType: integer, (mandatory)
 *   comment: string (optional, mandatory if flagType = 1)
 * }
 *
 * ## Reponse:
 * If flagType isn't supplied:
 * {
 *   errorMessage: 'Bad request, expected flagType'
 * }
 *
 * If flagType isn't an integer:
 * {
 *   errorMessage: 'Bad request, flagType must be an integer'
 * }
 *
 * If flagType doesn't exist:
 * {
 *   errorMessage: 'Bad request, flagType does not exist'
 * }
 *
 * If comment is defined and not a string:
 * {
 *   errorMessage: 'Bad request, comment must be a string'
 * }
 *
 * If flagType = 1 and comment isn't supplied:
 * {
 *   errorMessage: 'Bad request, expected comment'
 * }
 *
 * If flagType = 1 and comment is a string shorter than 5 characters
 * {
 *   errorMessage: 'Bad request, comment must be more than 5 characters'
 * }
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