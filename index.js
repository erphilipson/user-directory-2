const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

MongoClient.connect('mongodb://localhost:27017/robots', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.get('/', function(req, res) {
  db.collection('users').find({}).toArray( function(err, result) {
    if (err) return console.log(err)
    res.render('index', {result})
  })
});

app.get('/employed', function(req, res){
  db.collection('users').find({job: {$ne:null}}).toArray(function(err, result) {
    if (err) return console.log(err)
    res.render('employed', {result})
  })
});

app.get('/unemployed', function(req, res){
  db.collection('users').find({job:null}).toArray(function(err, result) {
    if (err) return console.log(err)
    res.render('unemployed', {result})
  })
});


// app.use(routes);
