# Server

This document explains how the server is set up.

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

Since port 80 (the default http-port) and port 443 (the default https-port) can only be opened by the root user, we have set up a port forward that redirects connections on port 80 and 443 to port 8080, where our Node server is listening. 

`iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080`
`iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8080`

### HTTPS

Our server is set up to use HTTPS. The key and certificate for this is stored in the ssl/ folder, and the files are not stored in the git repository. If you want to run the server locally, you have to generate these files manually with the command below (make sure that you are located in the root directory of the project when running it).

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/node.key -out ssl/node.crt`

These certificates are not signed by a CA (Certified Authority), so they will not validate the identity of the server. They will though allow us to encrypt all communications with the server. 

## Database

PostgreSQL is used for the database.

## Build process

We have set up a GitHub webhook that sends a post request to the end point /git/pull on the server when something is pushed to the server repo. This initiates a `git pull` on the server, and ensures that the server is always running the latest code from master.
