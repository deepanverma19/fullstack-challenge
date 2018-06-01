//This file is used for creating Server on client side.
// https://localhost:8080/ is the url which loads the index.html in beginning
// Also compression is done on the client as compression module has been used

var express = require('express')
var app = express()
var compression = require('compression')
var fs = require('fs');
var https = require('https');

app.use(express.static(__dirname + '/views'));
app.use(compression({threshold: 0}));

https.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}, app).listen(8080);

app.get('/', function(req, res){
	res.writeHead({
     'Content-Encoding': 'gzip',
     'warning': "with content type charset encoding will be added by default"
  });
  res.sendFile('index.html');
});
