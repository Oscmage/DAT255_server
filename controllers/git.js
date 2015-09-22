var crypto = require('crypto');
var exec = require('child_process').exec;

/**
 * Executes the 'git pull' command on the server. This method is used by a webhook on github.
 */
exports.pull = function (req, res, next) {
    var signature = 'sha1=' + crypto.createHmac('sha1', process.env.SECRET_TOKEN)
            .update(JSON.stringify(req.body))
            .digest('hex');

    if (signature !== req.header('X-Hub-Signature')) {
        res.send(500);
        return next();
    }

    exec('git pull && npm install', function (err, stdout, stderr) {
        console.log(new Date().toISOString(), 'stdout: ' + stdout);
        console.log(new Date().toISOString(), 'stderr: ' + stderr);

        if (err) {
            res.send(500);
            return next(err);
        }

        res.send(200);
        next();
    });
};
