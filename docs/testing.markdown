# Testing

## Running tests

The tests are located in the tests/ folder. To run the tests, do the following:
 
 1. Open the terminal and head to the project root directory.
 2. Launch the node server locally by typing: `npm start`
 3. Run the tests by typing: `npm test`

## Technical

Our tests are set up with the test framework Mocha (https://mochajs.org/), and the assertion library Chai (http://chaijs.com/). 

### Requests

To test requests, we are using Restify's built in JSON client. We use this client to send requests to localhost (which means that you need to have a server running locally before you start running the tests). We then check that we get the correct response status code, and if eventual error messages are correct.