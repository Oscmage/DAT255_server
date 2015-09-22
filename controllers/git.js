var exec = require('child_process').exec;

/**
 * Executes the 'git pull' command on the server. This method is used by a webhook on github.
 *
 * @param req The request object.
 * @param res The response object.
 * @param next The next method in the call chain.
 */
exports.pull = function (req, res, next) {
    exec('git pull', function (err, stdout, stderr) {
        console.log(new Date().toISOString(), 'stdout: ' + stdout);
        console.log(new Date().toISOString(), 'stderr: ' + stderr);

        if (err) {
            res.send(500);
            next(err);
        } else {
            res.send(200);
            next();
        }
    });
};
