const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const db = require('../database/index.js');
const env = require('dotenv').config();
const util = require('./util.js');

// const passportLocal = require('passport-local');
// const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 4000;

const app = express();
const cookieparser = require('cookie-parser')
// const models = require("../database/models");
// const authRoute = require('../database/passport_routes/auth.js')(app,passport);
// const passportStrat = require('../database/passport/passport.js')(passport, models.user);

// const models = require('../database/models');
// const authRoute = require('../database/passport_routes/auth.js')(app,passport);
// const passportStrat = require('../database/config/passport/passport.js')(passport, models.user);
// app.set('view engine', 'jade');

// initialize passport and the express sessions and passport sessions
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'luihfihuiluihiluh34hhglihlse893423rlhfsdiheiiqlqkbcsaajblaeww43232er3',
  resave: false, //             resave - false means do not save back to the store unless there is a change
  saveUninitialized: false, //  saveuninitialized false - don't create a session unless it is a logged in user
  cookie: { expires: 24 * 60 * 60 * 1000 }
}));

app.get('/', (req, res, next) => {
  console.log(`HOME SCREEN ========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`);
  console.log(`SESSION: ${JSON.stringify(req.session)}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));

const isLoggedIn = (req, res, next) =>
  req.isAuthenticated() ? next() : res.sendStatus(401);

app.get('/searchListing', (req, res) => {
  console.log(`get to searchlisting ========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`);

  let zip = req.param('zip');
  if (zip !== undefined) { zip = zip.substr(0, 3) + '__'; }
  const queryStr = zip ? { where: { zipCode: { $like: zip } } } : {};
  db.Listing.findListingsByZip(queryStr, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post('/listing', isLoggedIn, (req, res) => {
  console.log(`post to listing ========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`)

  db.Listing.createListing(req.body, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

// handlers for refresh button on all views
// res.redirect('back') will take user back to homepage
app.get('/createListing', (req, res) => {
  res.redirect('localhost:3000/createListing');
});

app.get('/loginView', (req, res) => {
  // res.render('loginView');
  res.redirect('localhost:3000/loginView');
});


app.get('/house', (req, res) => {
  // res.render('loginView');
  res.redirect('localhost:3000/house');
});

app.get('/search', (req, res) => {
  // res.render('searchView');
  res.redirect('localhost:3000/search');
});

app.get('/signup', (req, res) => res.render('signup'));
app.get('/loginView', (req, res) => res.render('login'));

app.get('/logout', (req, res) => {
req.session.destroy(function() {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});
/**
 * Create user will post to /signup for adding a user or to validate if username is available
 * post to signup will return
 * 201 when a valid user has been created
 * 202 code indicates that this user name already exists on the database
 * 204 indicates username is not in use, but since no password was sent with the request, no creation will happen
 * 409 when the databse rejected an add user
 */
app.post('/signup', (req, res) => {
  db.User.findbyUsername(req.body.username, (err, user) => {
    if (user) {
      return res.status(202).redirect('/signupview');
    }
    if (!req.body.password) {
      return res.status(204).redirect('/signupview');
    }
    // if we got to this point, we have a valid request to create a user in our database
    const { username, password, firstname, lastname } = req.body;
    const newUser = {
      username,
      password,
      firstname,
      lastname,
      email: username
    };
    db.User.createUser(newUser, (err, user) => {
      if (err) {
        res.status(409).send(err);
      } else {
        util.createSession(req, res.status(201), newUser);
      }
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.User.validateLogin(username, password, (err, userid) => {
    if (userid) {
      req.login(userid, err => {
        console.log(`========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`)
        res.status(200).redirect('/');
      })
    } else {
      res.status(401).redirect('/loginView');
    }
  });
});



passport.serializeUser(function(userid, done) {
  done(null, userid);
});
passport.deserializeUser(function(userid, done) {
  done(null, userid);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
