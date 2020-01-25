/**
 * Open a webserver to serve a basic page with elements to check the steps.
 */

var http = require('http');
var fs = require("fs");
 
console.log("Running on http://localhost:3000");

http.createServer(function(request, response) {
    fs.readFile("index.html", function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
      });
}).listen(3000);
