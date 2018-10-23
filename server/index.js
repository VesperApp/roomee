const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const {
  db,
  createListing,
  findListingsByZip,
  findListingsByID,
  createUser,
  validateLogin,
} = require('../database/databaseRoutes.js');

const { createSession } = require('./util.js');
const { scope } = require('./server.config.js').fbConfig;

// const passportLocal = require('passport-local');
// const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 4000;

const app = express();
const cookieparser = require('cookie-parser');
// const models = require("../database/models");
// const authRoute = require('../database/passport_routes/auth.js')(app,passport);
// const passportStrat = require('../database/passport/passport.js')(passport, models.user);

// const models = require('../database/models');
// const authRoute = require('../database/passport_routes/auth.js')(app,passport);
// const passportStrat = require('../database/config/passport/passport.js')(passport, models.user);
// app.set('view engine', 'jade');

// initialize passport and the express sessions and passport sessions
app.use(
  session({
    secret: Math.random()
      .toString(36)
      .substring(2),
    // resave: false, //             resave - false means do not save back to the store unless there is a change
    // saveUninitialized: false, //  saveuninitialized false - don't create a session unless it is a logged in user
    cookie: { expires: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/', (req, res, next) => {
  console.log(
    `HOME SCREEN ========current user is >>${req.user}
    << and this user authentication is >>${req.isAuthenticated()}<< ============`
  );
  // console.log("\x1b[33m%s\x1b[0m", `SESSION: ${JSON.stringify(req.session)}`);
  // console.log("\x1b[33m%s\x1b[0m", `USER: ${JSON.stringify(req.user)}`);
  next();
});

app.get('/searchListing', (req, res) => {
  // console.log(`get to searchlisting ========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`);
  // console.log(req.body)
  let zip = req.param('zip');
  if (zip !== undefined) {
    zip = zip.substr(0, 3) + '__';
  }
  const queryStr = zip ? { where: { zipCode: { $like: zip } } } : {};

  findListingsByZip(queryStr, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
  // POSTMAN TEST DATA
  // params => Key:zip, Value:70826
});

/**
 * Get all the fbusers for now, should be refactored to
 */
app.get('/roomees', (req, res) => {
  db.FBUser.findAll()
    .then(roomees => res.status(200).send(roomees))
    .catch(err => res.status(500).send(err));
});

// ED: DISABLED: SESSION FOR SERVER TESTING
// const isLoggedIn = (req, res, next) =>
//   req.isAuthenticated() ? next() : res.sendStatus(401);
// ED: add this middle ware to post route for /listing:
// app.post('/listing', isLoggedIn, (req, res) => {

app.post('/listing', async (req, res) => {
  // console.log(`post to listing ========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`)
  // console.log(req.body);
  req.body.userId = req.user === undefined ? req.body.userId : req.user.id;
  req.body.photos = req.body.photosData;
  req.body.price = req.body.price || null;
  try {
    const createdListing = await createListing(req.body);
    res.status(201).send(createdListing);
  } catch(err) {
    const log = err.name || err
    res.status(500).send(`Failed to create: ${log}`);
  }
  // POSTMAN TEST DATA
  // {
  //   "userId": 1,
  //   "price": 500,
  //   "title": "cozy room",
  //   "city": "gotham",
  //   "stateAbbr": "IDK",
  //   "address": "some street",
  //   "address2": "some place",
  //   "lon": 100.5,
  //   "lat": 102.5,
  //   "zipCode": 666,
  //   "description": "nice",
  //   "photosData": [{"url": "http://yo1.jpg"}, {"url": "http://yo2.jpg"}]
  // }
});

app.get('/userListings', (req, res) => {
  findListingsByID(req.param('userId'), (err, result) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.send(result);
    }
  });
  // POSTMAN TEST DATA
  // params => Key:userId, Value:1
});

app.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy(() => {
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
  if (!req.body.password) {
    return res.status(204).redirect('/signupview');
  }
  // if we got to this point, we have a valid request to create a user in our database
  const { username, password, firstname, lastname, zipCode, gender, age } = req.body;
  const newUser = {
    username,
    password,
    firstname,
    lastname,
    email: username,
    zipCode,
    gender,
    age,
  };
  createUser(newUser, (e, user) => {
    if (e) {
      res.status(409).send(e);
    } else {
      createSession(req, res.status(201), newUser.username);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  validateLogin(username, password, (err, userid) => {
    if (userid) {
      createSession(req, res.status(200), username);
    } else {
      res.status(401).redirect('/loginView');
    }
  });
});

/**
 * Get the login user object.
 */
app.get('/loginUser', (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send(req.user);
  }
});

// ** Facebook Oauth **//
app.get('/login/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: scope }));

app.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope,
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/');
  }
);
// ** **/

passport.serializeUser((fbUser, done) => {
  done(null, fbUser);
});
passport.deserializeUser((fbUser, done) => {
  done(null, fbUser);
});

const routes = require('./graphAPI.js')(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

module.exports = app;
