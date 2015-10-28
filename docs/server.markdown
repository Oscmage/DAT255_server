# Server

This document explains briefly how the server is set up, more in depth information can be found in the developer documentation.

## Technical information

The server is set up as a Digital Ocean droplet. The physical server is located in Amsterdam.

The specifications of the server is the following:

* 95.85.21.47
* 512MB Ram
* 20GB SSD Disk
* Ubuntu 14.04 x64

## Users

The server has two users: root and www. To gain ssh access for these users from your local machine, you have to add your public ssh key to the file `authorized_keys` located in the users' home directory. All team members have their keys added to this file for both the root and the www user.

### root

This is the superuser. This user should not be used for other things than installing software.

### www

This is the user responsible for our web server. All web files are located in the home directory of this user (/home/www).

## Node

Our server software is written in Javascript on the Node.js platform. The Node server is handled by pm2. To see if our Node server is up, run `pm2 list` as the www user. To start the Node server, use the command `pm2 start server.js --watch`. pm2 automatically reloads the server when any file changes.

To stream the logs from the server, run `pm2 logs <process id>`, where process id is the id for the server.js process (it's usually 0).

Since port 80 (the default http-port) and port 443 (the default https-port) can only be opened by the root user, we have set up a port forward that redirects connections on port 80 and 443 to port 8080, where our Node server is listening. 

    iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
    iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8080

### HTTPS (not activated right now, server is using HTTP)

Our server is set up to use HTTPS. The key and certificate for this is stored in the ssl/ folder. These files are not stored in the git repository, so if you want to run the server locally you have to generate these files manually. There is a bash script for generating these keys located in the sh/ folder. To execute it, just type `sh/generate_ssl_key.sh` while standing in the project root directory. You will be prompted to fill in a bunch of information, but you don't have to fill out anything (just press enter).

These certificates are not signed by a CA (Certified Authority), so they will not validate the identity of the server. They will allow us to encrypt all communications with the server though.

## Build process

We have set up a GitHub webhook that sends a post request to the endpoint `/github/callback` on port `3420` on the server when something is pushed to the server repo. This initiates a `git pull` on the server, and ensures that the server is always running the latest code from master.

To start the webhook listener on the server, run `sh/start_github_webhook_listener.sh` while standing in the project root directory. If you want to check if the listener is running, run `ps aux | grep [g]ithubhook`. To stop the listener, run `sh/stop_github_webhook_listener.sh`.

This webhook listener only accepts post requests from GitHub, using their method of securing webhooks by generating a hash from the payload content and our secret token. If you try to send a normal post request to the callback endpoint you will receive an error.

The webhook listener logs all activity to the file `logs/hook.log`.