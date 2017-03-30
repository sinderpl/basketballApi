const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
//var http = require('https');

//app var
const app = express();


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

/**
app.post('/quotes', (req, res) => {
  console.log(req.body)
})**/

//Get user data, verify by pin
//Test url to access
// http://localhost:3000/user/Alan%20Niemiec/2345
app.post('/user', getUserData);

app.get('/leaderboard');

app.get('/addRecord');
    //MONGO code
//Mongo instance
var db;

//User data objects
var currentUser;
var currentUserAccounts = new Map();

MongoClient.connect("mongodb://Test:Test@ds139187.mlab.com:39187/heroku_vh3f7203", (err, database) => {
  db = database;
  console.log("db connection ready");

  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
})
