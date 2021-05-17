const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userSchema = require("./models/User");
const productSchema = require("./models/Product");

var cors = require('cors')
var session = require('express-session')
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

if(!User.findOne({ name: "szaboz"})){
  const teszt = new User({ name: "szaboz", password: "PRF2021"})
  console.log(teszt)
  teszt.save();
}

/*
const teszt = new Product({ name: "Samsung laptop", description: "Fehér színű", prize: "145000", image: "../assets/note2.jpg"})
teszt.save();
*/

const port = 3000

app.use(cors())
app.use(bodyParser.json());

app.use(express.static("../webshop-app/dist/webshop-app/"));

/*User.findOne({
  name: "szaboz"
}, (err, user) => {
  console.log(user)
  console.log(err)
})*/

app.use(session({
  secret: 'titkos kulcs',
  resave: false,
  saveUninitialized: true
}))

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  function (name, password, done) {
    User.findOne({
      name: name
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Hibás felhasználónév!'
        });
      }
      user.comparePasswords(password, function (error, isMatch) {
        if (error) return done(error, false);
        if (!isMatch) return done('Hibas jelszó!', false);
        return done(null, user);
      })
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get('/', (req, res) => {
  res.sendFile("../webshop-app/dist/webshop-app/index.html")
});

/*, (req, res)=>{
  res.send("Sikeres bejelentkezés!")
}*/
app.post('/login', (req, res, next) => {
  if (req.body.name) {
    passport.authenticate('local', function (error, user) {
      if (error) return res.status(500).send(error);
      req.login(user, function (error) {
        if (error) return res.status(500).send(error);
        return res.status(200).send('Bejelentkezes sikeres');
      })
    })(req, res);
  } else {
    return res.status(400).send('Hibas keres, username es password kell');
  }
});

app.post('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
    return res.status(200).send('Kijelentkezes sikeres');
  } else {
    return res.status(403).send('Nem is volt bejelentkezve');
  }
})

/*
name: result.name,
      description: result.description,
      prize: result.prize,
      quantity: result.quantity
*/
app.post('/products', (req, res) => {
  Product.find((err, result)=>{
    res.send(result)
  })  
})


app.listen(port, () => {
  console.log(`Yeah, a szerver fut! http://localhost:${port}`)
})