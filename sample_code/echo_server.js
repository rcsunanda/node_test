var http = require('http');

function on_message(request, response) {
   console.log("Message received");
   console.log(request);

   console.log("Sending response");
   response_header = {'Content-Type': 'text/plain'};
   response.writeHead(200, response_header);
   response.end('Hello there\n');
}

function run_server() {
   var port = 10000;
   console.log("Starting echo server. port=" + port);
   var server = http.createServer(on_message);
   server.listen(port);
}

run_server();