var restify = require('restify');

var git = require('./controllers/git');
var pages = require('./controllers/pages');

var PORT = 8080;

// initate server
var server = restify.createServer({
    name: 'DAT255_server'
    // TODO: https certificate
});

// add pages routes
server.get('/', pages.index);

// add git routes
server.post('/git/pull', git.pull);

// start server
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
