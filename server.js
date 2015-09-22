var restify = require('restify');

var git = require('./controllers/git');
var pages = require('./controllers/pages');
var flags = require('./controllers/flags');

var PORT = 80;

// initate server
var server = restify.createServer({
    name: 'DAT255_server'
    // TODO: https certificate
});

server.use(restify.bodyParser({ mParams: false }));

// add pages routes
server.get('/', pages.index);

// add git routes
server.post('/git/pull', git.pull);

// add flags routes
server.post('/flags', flags.add);

// start server
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
