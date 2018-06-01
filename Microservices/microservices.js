// Listed are the variables declared by installing the node modules
// 1. MicroServices Security
// 2. Encrypted communication with the microservices
// 3. Caching done at microservices level using mysql cache
// 4. Used GMail API to fetch the received emails, did authorization

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var fs = require('fs');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var mysqlcache = require('mysql-cache');
var https = require('https');
var readline = require('readline');
var {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_PATH = 'credentials.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMessages);
});

app.use(compression({threshold: 0}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Making connection the Database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ggg_fse"
});

//Using mysqlcache for caching purposes
var cache = new mysqlcache({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database:'ggg_fse',
  cacheProvider: 'LRU',
});

//Connecting cache
cache.connect(err =>{
  if(err){
    throw err;
  }
  console.log("Cache Connected Successfully !!")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Creating a server on 8082
https.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
}, app).listen(8082);

//This variable getExistingContacts is used to fetch the existing contacts from the database and use cache when required
var getExistingContacts = function(){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "ggg_fse"
      });
    }
      console.log("SELECT * FROM contacts");
      cache.query("SELECT * FROM contacts", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
        if(cache.hits == 0){
          console.log("\033[92mCache Missed !!\033[0m");
        }else{
          console.log("\033[94mCache hit !!\033[0m");
        }
    });
  });
  return promise;
}

//This variable createNewContact is used to create a new contact and insert it into the database and use cache when required
var createNewContact = function(firstname, lastname, email){
  cache.flush(err => {
        if (err) {
            throw new Error(err)
        }
        console.log('\033[94mCache Destroyed!\033[0m')
  });

  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "ggg_fse"
      });
    }
      console.log("INSERT INTO contacts VALUES(NULL,'"+firstname+"','"+lastname+"','"+email+"')");
      con.query("INSERT INTO contacts VALUES(NULL,'"+firstname+"','"+lastname+"','"+email+"')", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
    });
  });
  return promise;
}

//This variable getExistingConversations is used to fetch the existing conversations from the database and use cache when required
var getExistingConversations = function(){
  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "ggg_fse"
      });
    }
      console.log("SELECT * FROM conversations");
      cache.query("SELECT * FROM conversations", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
        if(cache.hits == 0){
          console.log("\033[92mCache Missed !!\033[0m");
        }else{
          console.log("\033[94mCache hit !!\033[0m");
        }
    });
  });
  return promise;
}

//This variable createNewConversation is used to create a new conversation and insert it into the database and use cache when required
var createNewConversation = function(firstname, lastname, email, conversationtopic, messagecontent){
  cache.flush(err => {
        if (err) {
            throw new Error(err)
        }
        console.log('\033[94mCache Destroyed!\033[0m')
  });

  var promise = new Promise(function(resolve, reject){
    if(con === null){
      con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "ggg_fse"
      });
    }
      console.log("Data Inserted Successfully Into The Conversations Database");
      con.query("INSERT INTO conversations VALUES(NULL,'"+email+"','"+firstname+"','"+lastname+"','"+conversationtopic+"','"+messagecontent+"')", function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      });
  });
  return promise;
}

//This variable sendingEmailTo is used for sending an email to the specified person using nodemailer
var sendingEmailTo = function(firstname, lastname, emailID, conversationTopic, messageContent){
  var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gggfse1',
      pass: 'ggg_fse1'
    }
  });

  var mailOptions = {
    from: 'ggg_fse1@gmail.com',
    to: emailID,
    subject: conversationTopic,
    text: messageContent
  };

  transport.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Email Sent Successfully:' + info.response);
    }
  });
};

//This function is used to authorize the client_secret.json file, client_id
function authorize(credentials, callback) {
  var {client_secret, client_id, redirect_uris} = credentials.installed;
  var oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

//This function is used to get a new token
function getNewToken(oAuth2Client, callback) {
  var authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

//This function is used to get the List of all messages whether sent, drafted or received
function listMessages(auth)	{
	var gmail = google.gmail({version: 'v1', auth});
	gmail.users.messages.list({
		userId: 'me',
	}, (err, {data}) => {
		if(err) return console.log('The API returned an error: ' + err);
		var messages = data.messages;
		messages.forEach((message) =>{
			getMessage(auth, message.id);
		});
	});
}

//This function is used to get only appropriate received message and is called above in listMessages function
function getMessage(auth, messageId){
	var gmail = google.gmail({version: 'v1', auth});
	gmail.users.messages.get({
		userId: 'me',
		id: messageId
	}, (err, {data}) => {
		if(err) return console.log('The API returned an error: ' + err);
		var message = data;
		var inbox = "IMPORTANT,CATEGORY_PERSONAL,INBOX"
		if(`${message.labelIds}` === inbox){
			var receivedtext = `${message.snippet}`;
      var subject = `${message.payload.headers[22].value}`;
      var person = `${message.payload.headers[19].value}`;
      var persondetails = person.split(" ");
      firstname = persondetails[0];
      lastname = persondetails[1];
      email = persondetails[2];
      email = email.replace('<','');
      email = email.replace('>','');
      console.log("One reply from "+firstname+" "+lastname+" "+email);
      createNewConversation(firstname, lastname, email, subject, receivedtext);
		}
	});
}

// GET Existing Contacts microservice
app.get('/getExistingContacts-microservices', function(req, res){

  console.log("Client called /getExistingContacts-microservices");
  var result = null;

  getExistingContacts().then(function(dataresult){
    result = dataresult;
    res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });


  }).then(function(){
    con = null;
  });
});

// POST i.e. Create new Contacts microservice
app.post('/createContact-microservices', function(req, res){

  console.log("Client called /createContact-microservices");
  var result = null;

  createNewContact(req.query.first_name, req.query.last_name, req.query.email_id).then(function(dataresult){
    result = dataresult;
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });

  }).then(function(){
    con = null;
  });
});

// POST i.e. Create new Conversation microservice

app.post('/createConversation-microservices', function(req, res){

  console.log("Client called /createConversation-microservices");
  var result = null;

  sendingEmailTo(req.query.first_name, req.query.last_name, req.query.email_id, req.query.topic, req.query.message_content)
  createNewConversation(req.query.first_name, req.query.last_name, req.query.email_id, req.query.topic, req.query.message_content).then(function(dataresult){
    result = dataresult;
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });

  }).then(function(){
    con = null;
  });
});

// GET Existing Conversations microservice

app.get('/getExistingConversations-microservices', function(req, res){

  console.log("Client called /getExistingConversations-microservices");
  var result = null;

  getExistingConversations().then(function(dataresult){
    result = dataresult;
      res.format({
       'application/json': function(){
          res.send(dataresult);
       }
     });

  }).then(function(){
    con = null;
  });
});
