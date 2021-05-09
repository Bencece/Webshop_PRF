const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

var cors = require('cors')
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

await mongoose
  .connect('mongodb://localhost/my_database', {useNewUrlParser: true})
  .then(()=>{ console.log("Mongoose csatlakoztatva.")})
  .catch((err)=>{ console.log(err)})

const port = 3000

app.use(cors())
app.use(bodyParser.json());

app.use(express.static("../webshop-app/dist/webshop-app/"));

app.get('/', (req,res) => {
  res.sendFile("../webshop-app/dist/webshop-app/index.html")
});

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webshop");
  var myobj = { name: "szaboz", password: "PRF2021" };
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});*/ 

app.listen(port, () => {
  console.log(`Yeah, a szerver fut! http://localhost:${port}`)
})
