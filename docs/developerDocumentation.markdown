# Developer documentation

The application is decomposed into the following parts:

* Config - contains configurations for the mongolabs setup
* Controllers - contains files which accepts calls from server.js
* Model - contains representations of the models we save to the database
* Server.js - the spider in the web, the file which handles directing out responsibilities
* Tests - contains tests for controllers
 
## How server.js and controllers works together
 
The server.js handles delegating responsibility for certain request and then the controller file executes whatever it's supposed to do.
For example, lets say that you would send a get request to the API in the following form "/flags/:journeyID". The following would then occur:
1. Server.js would receive a request. 
2. Sever.js then delegate the responsibility for this request, in this case to the method "getFlagsForJourney" within the controller file "flags.js".
3. The method getFlagsForJourney asks the moongose module to find flags with the specified journeyID.
4. Mongolabs finds the flags for the id and returns a json object to the flags.js
5. flags.js then returns the response.
 
## Database

### Persistent data storage
The only data that is stored persistently is the flags. These are stored at mongolabs, which can be manipulated via a RESTful API. The flags are stored in a MongoDB document database. There are no relations. Here is what a flag looks like, in JSON format:

        {
            "_id": "562e3bcfed6c36266108b763",
            "flagType": 14,
            "comment": "foobar",
            "journeyID": "9015014505500098",
            "dgw": "Ericsson$171330",
            "time": "Mon Oct 26 15:42:22 CET 2015",
            "__v": 0
        }

The `_id` field is the key of the tuple. `flagType` is which of all available flags have been posted. `comment` is a string entered by the user to post with the flag. `journeyID` connects the flag to a journey, as specified by the Västtrafik API. `dgw` is the vehicle id assigned by the Electricity API.

### Location

The database is located at: mongodb://admin:aliveandclickin@ds051843.mongolab.com:51843/dat255

### Schema

The current schema for how the database is structured is located in "/model/flag.js" and looks like this

var flagSchema = new mongoose.Schema({
	flagType : Number,
	comment : String,
	dgw: String,
	journeyID: String,
	time: String
});

## Testing

### Running tests

To test requests, we are using Restify's built in JSON client. We use this client to send requests to localhost (which means that you need to have a server running locally before you start running the tests). We then check that we get the correct response status code, and if eventual error messages are correct.

The tests are located in the tests/ folder. To run the tests, do the following:
 
 1. Open the terminal and head to the project root directory.
 2. Launch the node server locally by typing: `npm start`
 3. Run the tests by typing: `npm test`

## Dependencies (or modules as they're called in node)

### Restify

Restify is used to create a lightweight REST API for the server, more information regarding Restify and its docs can be found [here](http://restify.com/).

### Mongoose

To model the schema of flags in the database we use Mongoose, read more about Mongoose [here](http://mongoosejs.com/).

### Nodemon

Nodemon is a simple module for automaticly restarting the server when source code is updated, read more about it [here](http://nodemon.io/).

### Chai

Chai is an assertion library for node, which is used together with the module Mocha to run tests, read more about it [here](http://chaijs.com/).

### Mocha

Mocha is the test framework used, together with Chai it takes care of testing on the server, read more about Mocha [here](http://mochajs.org/).



