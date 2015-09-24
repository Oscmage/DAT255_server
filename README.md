# Commutity

A repository for the server side code of the Commutity project.

## Set up

To set up the server locally just follow these steps.

### Step 0 - install prerequisites

The server runs on Node. Follow the instructions here (https://nodejs.org/en/download/) to install it.

### Step 1 - clone the repo to your computer

    git clone https://github.com/Oscmage/DAT255_server.git
    cd DAT255_server

### Step 2 - install dependencies

    npm install

This will install all Node dependencies for the server.

### (Step 3 - generate HTTPS certificate) 

The server doesn't use HTTPS at the moment, so you can skip this step.

    sh/generate_ssl_key.sh

You will be prompted to input some information, but you don't have to enter anything (just press enter).

### Step 4 - run the server

    npm start

This will start the server at port 8080. The server will automatically reload when any code changes.

### Step 5 - run tests

    npm test
