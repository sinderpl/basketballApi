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
  res.sendFile(__dirname + '/index.html')
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

app.get('/leaderboard' ,getLeaderboard);

app.get('/addRecord', addRecord);
    //MONGO code
//Mongo instance
var db;

//User data objects
var currentUser;
var currentUserAccounts = new Map();

MongoClient.connect("mongodb://testBasketball:password12345@ds145220.mlab.com:45220/heroku_sjst9tqr", (err, database) => {
  db = database;
  console.log("db connection ready");

  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
})


function findOne(collectionName, query, callback){
   db.collection(collectionName).findOne(query, function (err, item){
     if (err){
       callback(err);
     }
     else{
       //Return the data with no errors
       callback(null, item);
    }
   });
 }

function getLeaderboard(req, res){
  //Constuct the query
  var query = {"users"};
  //Find one user only in the database
  findOne("leaderboard", query, function (err, item){
      //Log any errors
      if(err) {
       console.log(err);
        return;
     }

      //If result is not empty return the data
      if(item){
        console.log(item);
        console.log("Leaderboard has been found");
         res.type('json');
         res.json(item);

      }
      else{
        console.log("Leaderboard not found\n");
        res.status(500).send("Leaderboard has not been found");
    }
  });
}
