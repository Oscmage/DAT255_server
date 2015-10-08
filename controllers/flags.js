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

var mongoose = require('mongoose');
var Flag = mongoose.model('Flag');


exports.add = function (req, res, next) {
    var LARGEST_FLAG_NUMBER = 6;
    var LOWEST_FLAG_NUMBER = 1;

    var params = req.params;
    var flagType = params.flagType;
    var comment = params.comment;
    var journeyID = params.journeyID;
    var dgw = params.dgw;

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

    var newFlag = new Flag({
        flagType: flagType,
        comment: comment,
        journeyID: journeyID,
        dgw: dgw
    });

    newFlag.save(function(err,newFlag) {
        if (err) return console.error(err);
        console.log("success")
    });

    res.send(200);
    next();
};


exports.getFlagsForJourney = function(req, res, next){
    var journeyID = req.params.journeyID;
    Flag.find({
        journeyID: journeyID
    },function(err, flags){
        if (err) return console.error(err);
        res.send(flags);
        next();
    });
};

exports.getAll = function(req, res, next){

    Flag.find(function(err, flags){
        if (err) return console.error(err);
        res.send(flags);
        next();
    })
    

};
