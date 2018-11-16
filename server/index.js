const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./auth');

const { createListing, findListingsByZip, findListingsByID } = require('../database/databaseRoutes.js');

const User = require('../database/models/User');

const { checkLogin } = require('./util');

const PORT = process.env.PORT || 4000;

const app = express();

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

// See: https://www.sitepoint.com/local-authentication-using-passport-node-js/
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
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

app.post('/listing', checkLogin, async (req, res) => {
  console.log(
    `post to listing ========current user is >>${
      req.user
    }<< and this user authentication is >>${req.isAuthenticated()}<< ============`
  );
  console.log('ED HELLO**********:', req.body);
  req.body.userId = req.user === undefined ? req.body.userId : req.user.id;
  // req.body.photos = req.body.photosData;
  req.body.price = req.body.price || null;
  try {
    const createdListing = await createListing(req.body);
    console.log(createdListing);
    res.status(201).send(createdListing);
  } catch (err) {
    const log = err.name || err;
    console.log(log);
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
app.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/' }), (req, res) => {
  // After authentication, we can fetch the user model through req.
  console.log('***SESSION****', req.user);
  res.redirect('/');
});

app.post('/login', passport.authenticate('local-login'), (req, res) => {
  // After authentication, we can fetch the user model through req.
  console.log('***SESSION****', req.user);
  res.redirect('/');
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

module.exports = app;
