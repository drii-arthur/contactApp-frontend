var http = require("http");

//create a server object:
http
  .createServer(function (req, res) {
    res.write("hello world")
    console.log("Running Server in port : 3000"); //write a response to the client
    res.end(); //end the response
  })
  .listen(3000); //the server object listens on port 8080



