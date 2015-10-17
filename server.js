var restify = require('restify');
var fs = require('fs');
var db = require('./model/db');

var git = require('./controllers/git');
var pages = require('./controllers/pages');
var flags = require('./controllers/flags');

var PORT = 8080;

// initate server
var server = restify.createServer({
    name: 'DAT255_server'
    //certificate: fs.readFileSync('ssl/node.crt'),
    //key: fs.readFileSync('ssl/node.key')
});

server.use(restify.bodyParser());

// add pages routes
server.get('/', pages.index);

// add git routes
server.post('/git/pull', git.pull);

// add flags routes
server.post('/flags', flags.add);

server.get('/flags', flags.getAll);

server.del('/flags/delete/:flagID', flags.removeFlagById);

server.get('/flags/:journeyID', flags.getFlagsForJourney);

// start server
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});
