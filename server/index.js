const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../database/index.js");
const env = require("dotenv").config();
const passport = require("passport");
const { createSession } = require("./util.js");
const { scope } = require("./server.config.js").fbConfig;

// const passportLocal = require('passport-local');
// const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 4000;

const app = express();
const cookieparser = require("cookie-parser");
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
    secret:
      "luihfihuiluihiluh34hhglihlse893423rlhfsdiheiiqlqkbcsaajblaeww43232er3",
    //resave: false, //             resave - false means do not save back to the store unless there is a change
    //saveUninitialized: false, //  saveuninitialized false - don't create a session unless it is a logged in user
    cookie: { expires: 24 * 60 * 60 * 1000 }
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  console.log(
    `HOME SCREEN ========current user is >>${
      req.user
    }
    << and this user authentication is >>${req.isAuthenticated()}<< ============`
  );
  console.log("\x1b[33m%s\x1b[0m", `SESSION: ${JSON.stringify(req.session)}`);
  console.log("\x1b[33m%s\x1b[0m", `USER: ${JSON.stringify(req.user)}`);
  next();
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/searchListing", (req, res) => {
  // console.log(`get to searchlisting ========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`);
  // console.log(req.body)
  let zip = req.param("zip");
  if (zip !== undefined) {
    zip = zip.substr(0, 3) + "__";
  }
  const queryStr = zip ? { where: { zipCode: { $like: zip } } } : {};

  db.Listing.findListingsByZip(queryStr, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

/**
 * Get all the fbusers for now, should be refactored to 
 */
app.get('/roomees', (req, res) => {
  db.FBUser.findAll()
           .then((roomees) => res.status(200).send(roomees))
           .catch((err) => res.status(500).send(err));
});

//ED: DISABLED: SESSION FOR SERVER TESTING
// const isLoggedIn = (req, res, next) =>
//   req.isAuthenticated() ? next() : res.sendStatus(401);
//ED: add this middle ware to post route for /listing:
//app.post('/listing', isLoggedIn, (req, res) => {

app.post("/listing", (req, res) => {
  // console.log(`post to listing ========current user is >>${req.user}<< and this user authentication is >>${req.isAuthenticated()}<< ============`)
  console.log(req.body);
  req.body.userId=req.user.id;
  req.body.photos = req.body.photosData;
  req.body.price = req.body.price || null;
  db.Listing.createListing2(req.body, (err, result) => {
    if (err) {
      res.sendStatus(err);
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});

app.get('/userListings', (req, res) =>{
  console.log("DATABASE RESULT***********");
  console.log(req.param('userId'));

  db.Listing.findListingsByID(req.param('userId'), (err,result) => {
    if (err) {
      res.sendStatus(err);
    } else {
// Post Comment 

app.post("/comment", (req, res) => {
 
  db.Comment.createComment(req.body, (err, result) => {
    if (err) {
      res.sendStatus(err);
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});

//find comment by id 
app.get("/comment", (req, res) => {
  var id = req.body 

  db.Comment.findComment((err, result) => {
    if (err) {
      res.sendStatus(err);
    } else {
      // console.log(result);
      res.send(result);
    }
  });
});


//ED: DISABLED: inactive routes
// handlers for refresh button on all views
// // res.redirect('back') will take user back to homepage
// app.get('/createListing', (req, res) => {
//   res.redirect('localhost:3000/createListing');
// });

// app.get('/loginView', (req, res) => {
//   // res.render('loginView');
//   res.redirect('localhost:3000/loginView');
// });

// app.get('/house', (req, res) => {
//   // res.render('loginView');
//   res.redirect('localhost:3000/house');
// });

// app.get('/search', (req, res) => {
//   // res.render('searchView');
//   res.redirect('localhost:3000/search');
// });

// app.get('/signup', (req, res) => res.render('signup'));
// app.get('/loginView', (req, res) => res.render('login'));

app.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(function() {
    res.clearCookie("connect.sid");
    res.redirect("/");
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
app.post("/signup", (req, res) => {
  db.User.findbyUsername(req.body.username, (err, user) => {
    if (user) {
      return res.status(202).redirect("/signupview");
    }
    if (!req.body.password) {
      return res.status(204).redirect("/signupview");
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
        createSession(req, res.status(201), newUser.username);
      }
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.User.validateLogin(username, password, (err, userid) => {
    if (userid) {
      createSession(req, res.status(200), username);
    } else {
      res.status(401).redirect("/loginView");
    }
  });
});

/**
 * Get the login user object.
 */
app.get('/loginUser', (req, res) => {
  if(req.user) {
    res.status(200).send(req.user);
  } else{
    res.status(401).send(req.user);
  }
});

//** Facebook Oauth **//
app.get(
  "/login/facebook",
  passport.authenticate("facebook", { authType: "rerequest", scope: scope })
);

app.get(
  "/login/facebook/return",
  passport.authenticate("facebook", {
    authType: "rerequest",
    scope: scope,
    failureRedirect: "/login"
  }),
  function(req, res) {
    res.redirect("/");
  }
);
//** **/

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