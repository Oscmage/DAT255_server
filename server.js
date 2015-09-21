var restify = require('restify');
var exec = require('child_process').exec;


function respond(req, res, next) {
	res.send('hello ' + req.params.name);
	next();
}

var server = restify.createServer({
	name: 'DAT255_server'
});

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.get('/',function(req,res,next){
	res.send("hello!");
	next();
});

server.post('/hooks/webhook',function(req,res,next){
	res.status(200);
	executeGitPull();
	next();
});

function executeGitPull(){
	exec('git pull',
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error) {
				console.error('exec error: ' + error);
			}
		});
}

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});
