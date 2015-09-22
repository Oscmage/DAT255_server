/**
 *  This module handles post-request for "/flags".
 */
exports.add = function (req, res, next) {
    var LARGEST_FLAG_NUMBER = 6;
    var LOWEST_FLAG_NUMBER = 1;

    var body = req.body;
    var flagType = parseInt(body.flagType);
    var comment = body.comment;


    /*
        Checks if the flag type is valid.
     */
    if (isNaN(flagType)) {
        console.log("hej");
        res.send(400, {'errorMessage': 'Bad request, flagType is not an integer'});
        return next();
    } else if (!(LOWEST_FLAG_NUMBER <= flagType  && flagType <= LARGEST_FLAG_NUMBER)) {
        res.send(400,
            {'errorMessage': 'Bad request, flagType invalid, current range is '
            + LOWEST_FLAG_NUMBER + ' - ' + LARGEST_FLAG_NUMBER });
        return next();
    }

    /*
        Handles the valid flag types.
     */
    if (flagType === 1) {
        if (comment) {
            res.send(200);
            return next();
            //TODO: Save the information provided.
        } else {
            res.send(400, {'errorMessage': 'Bad request, comment is either null or empty'});
        }
    } else {
        res.send(200);
        //TODO: Save the information provided.
    }

    next();
};