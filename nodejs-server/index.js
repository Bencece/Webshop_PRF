const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userSchema = require("./models/User");
const productSchema = require("./models/Product");

var cors = require('cors')

var url = "mongodb://localhost:27017/webshop";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongoose csatlakoztatva.")
  })
  .catch((err) => {
    console.log(err)
  });

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

/*const teszt = new User({ name: "szaboz", password: "PRF2021"})
console.log(teszt)
teszt.save();

const teszt = new Product({ name: "Laptop", description: "asd", prize: "1234"})
teszt.save();*/

const port = 3000

app.use(cors())
app.use(bodyParser.json());

app.use(express.static("../webshop-app/dist/webshop-app/"));

app.get('/', (req, res) => {
  res.sendFile("../webshop-app/dist/webshop-app/index.html")
});



var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (name, password, done) {
    User.findOne({
      name: name
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.post('/logmein',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.listen(port, () => {
  console.log(`Yeah, a szerver fut! http://localhost:${port}`)
})