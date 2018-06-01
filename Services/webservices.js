// Listed are the variables declared by installing the node modules
// 1. Web Service Security
// 2. Encrypted communication with the microservices

var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var mysql = require('mysql');

app.use(compression({threshold: 0}));

// Making a connection with the MySQL database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ggg_fse"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Creating a server at 8081
https.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}, app).listen(8081);

// GET Existing Contacts web service
app.get('/getExistingContacts', function(req, res){

      var unirest = require("unirest");
      console.log("Web Services !!");
      var unirestreq = unirest("GET", "https://localhost:8082/getExistingContacts-microservices");

      unirestreq.strictSSL(false).end(function (unirestres) {
        if (unirestres.error) throw new Error(unirestres.error);
        res.format({
             'Content-Encoding':'gzip',
             'application/json': function(){
               console.log("unirestres.body",JSON.stringify(unirestres.body, null, 2));
                res.send(unirestres.body);
             }
           });
      });
});

// POST i.e. Create new Contacts web service
app.post('/createContact', function(req, res){

  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:8082/createContact-microservices?first_name="+req.query.first_name+"&last_name="+req.query.last_name+"&email_id="+req.query.email_id);

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send({"message":"Contact created. "});
         }
       });
  });
});

// POST i.e. Create new Conversation web service

app.post('/createConversation', function(req, res){

  var unirest = require("unirest");
  var unirestreq = unirest("POST", "https://localhost:8082/createConversation-microservices?first_name="+req.query.first_name+"&last_name="+req.query.last_name+"&email_id="+req.query.email_id+"&topic="+req.query.topic+"&message_content="+req.query.message_content);

  unirestreq.strictSSL(false).end(function (unirestres) {
    if (unirestres.error) throw new Error(unirestres.error);
    res.format({
         'application/json': function(){
            res.send({"message":"Conversation started. "});
         }
       });
  });
});

// GET Existing Conversations web service
app.get('/getExistingConversations', function(req, res){

      var unirest = require("unirest");
      var unirestreq = unirest("GET", "https://localhost:8082/getExistingConversations-microservices");

      unirestreq.strictSSL(false).end(function (unirestres) {
        if (unirestres.error) throw new Error(unirestres.error);
        res.format({
             'Content-Encoding':'gzip',
             'application/json': function(){
               console.log("unirestres.body",JSON.stringify(unirestres.body, null, 2));
                res.send(unirestres.body);
             }
           });
      });
});
