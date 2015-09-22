var exec = require('child_process').exec;

/**
 * Executes the 'git pull' command on the server. This method is used by a webhook on github.
 *
 * @param req The request object.
 * @param res The response object.
 * @param next The next method in the call chain.
 */
exports.pull = function (req, res, next) {
    exec('git pull', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error) {
            console.log('error!');
            res.status(500);
            next(err);
        } else {
            console.log('no error!');
            res.status(200);
            next();
        }
    });
};
