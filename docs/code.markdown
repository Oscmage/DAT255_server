## How is the code structured?

The launch file or the center of this server is located within "server.js". The server file then delegate the responsibility to handle request for different urls, those files are located within the "controllers" folder. 

All test files can be found under the folder "tests".

## Why is it done this way?

The reason for delegating responsibility from "server.js" is simply because we don't want this file clustered. We want you to be able to simply go into "server.js" and easy realise that file "xxx.js" handles request for that particular url. Another reason is to keep them separate to differentiate between server configuration versus logic.
   


