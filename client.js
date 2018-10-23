const request = require('request');

function on_response(err, res, body) {
   if (err) { 
      return console.log(err); 
   }
   
   console.log(res);
   console.log(body);
}

function send_request() {
   var url = 'http://localhost';
   var port = 10000;

   var full_url = url + ':' + port;

   console.log("Sending request to: " + full_url);
   request(full_url, { json: true }, on_response);
}

send_request();