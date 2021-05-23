const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userSchema = require("./models/User");
const productSchema = require("./models/Product");
var http = require('http');

require('dotenv').config()

var cors = require('cors')
var session = require('express-session')
var url = process.env.MONGO_SERVER_URL

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

/*
if (!User.findOne({
    name: "szaboz"
  })) {
  const teszt = new User({
    name: "szaboz",
    password: "PRF2021"
  })
  console.log(teszt)
  teszt.save();
}
*/

/*
const teszt = new Product({ name: "Acer laptop", description: "Fekete színű", prize: "120000", image: "../assets/note1.jpg", itemid: "1001"})
teszt.save();
const teszt2 = new Product({ name: "Samsung laptop", description: "Fehér színű", prize: "145000", image: "../assets/note2.jpg", itemid: "1002"})
teszt2.save();
*/

const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json());

app.use(express.static("nodejs-server/dist/webshop-app/", { root: __dirname }));

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
  res.sendFile("nodejs-server/dist/webshop-app/index.html", { root: __dirname })
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
  Product.find({
    "quantity": {
      $gt: 0
    }
  }, (err, result) => {
    res.send(result)
  })
})

app.post('/checkout', (req, res) => {
  if (req.body.products) {
    var products = req.body.products;
    products.forEach(product => {
      sendDataToSpringServer("/addTransaction",{
        itemid: product.itemid,
        date: Date.now(),
        prize: product.prize
      })
      sendDataToSpringServer("/addProduct",{
        itemid: product.itemid,
        name: product.name,
        prize: product.prize
      })
      Product.updateOne({ "itemid" : product.itemid }, { $inc: {quantity: -1}}, (err, msg) => {
        if(err){
          console.log(err)
          res.status(500).send("Hiba a terméknél")
        }
      })
    });
    res.status(200).send("Sikeres vásárlás!")
  }
})

function sendDataToSpringServer(url, data){
  var tr = JSON.stringify(data)
  var options = {
    host: process.env.SPRING_SERVER_URL,
    port: process.env.SPRING_SERVER_PORT,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': tr.length
    }
  };

  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log("Szerver válasz: " + chunk);
    });
  });
  req.write(tr);
  req.end();
}

app.listen(port, () => {
  console.log(`Yeah, a szerver fut! A port: ${port}`)
})