/**
 *
 */
exports.add = function (req, res, next) {
    var time = req.body.time;
    res.send(time);
    next();
};