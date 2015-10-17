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


    var params = req.params;
    var flagType = params.flagType;
    var comment = params.comment;
    var journeyID = params.journeyID;
    var dgw = params.dgw;
    var time = params.time;

    if (flagType === undefined) {
        res.send(400, {'errorMessage':'Bad request, expected flagType'});
        return next();
    }

    flagType = parseInt(flagType);

    if (isNaN(flagType)) {
        res.send(400,
            {'errorMessage': 'Bad request, flagType must be an integer'});
        return next();
    } 

    if (comment !== undefined && typeof comment !== 'string') {
        res.send(400,
            {'errorMessage': 'Bad request, comment must be a string'});
        return next();
    } else if(comment === undefined){
        comment = '';
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

    var formatedComment = comment.toString('utf8');

    var newFlag = new Flag({
        flagType: flagType,
        comment: formatedComment,
        journeyID: journeyID,
        dgw: dgw,
        time: time
    });

    newFlag.save(function(err,newFlag) {
        if (err) return console.error(err);
        console.log("success")
    });

    res.send(200);
    next();
};

exports.removeFlagById = function(req, res, next){

    var flagId = req.params.flagId;
    console.log("removing flagID : " + flagId);
    Flag.remove({
        _id: flagId
    },function(err){
        if(err){
            return console.error(err);
        }else{
            res.send(200);
            next();
        }

    });

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
