# Software decomposition

The application is decomposed into the following parts:

* Config - contains configurations for the mongolabs setup
* Controllers - contains files which accepts calls from server js
* Model - contains representations of the models we save to the database
* Server.js - the spider in the web, the file which handles directing out responsibilities
* Tests - contains tests for controllers
 
## How server.js and controllers works together
 
The server.js handles delegating responsibility for certain request and then the controller file executes whatever it's supposed to do.
For example, lets say that you would send a get request to the api in the following form "/flags/:journeyID". The following would then occur:
1. Server.js would receive a request. 
2. Sever.js then delegate the responsibility for this request, in this case to the method "getFlagsForJourney" within the controller file "flags.js".
3. The method getFlagsForJourney asks the moongose module to find flags with the specified journeyID.
4. Mongolabs finds the flags for the id and returns a json object to the flags.js
5. flags.js then returns the response.
 
## Database

### Location

The database is located at: mongodb://admin:aliveandclickin@ds051843.mongolab.com:51843/dat255

### Schema

The current schema for how the database is structured is located in "/model/flag.js".

## Testing

### Running tests

The tests are located in the tests/ folder. To run the tests, do the following:
 
 1. Open the terminal and head to the project root directory.
 2. Launch the node server locally by typing: `npm start`
 3. Run the tests by typing: `npm test`

### Technical

Our tests are set up with the test framework Mocha (https://mochajs.org/), and the assertion library Chai (http://chaijs.com/). 

### Requests

To test requests, we are using Restify's built in JSON client. We use this client to send requests to localhost (which means that you need to have a server running locally before you start running the tests). We then check that we get the correct response status code, and if eventual error messages are correct.

