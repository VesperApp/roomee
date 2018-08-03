const db = require('../database/index.js');
const fbPassport = require('passport');
const FacebookStrategy = require('passport-facebook');
const { clientID, clientSecret, callbackURL, profileFields} = require('./server.config.js').fbConfig;

fbPassport.use(new FacebookStrategy(
  {clientID, clientSecret, callbackURL, profileFields},
  (accessToken, refreshToken, profile, cb) => {
    console.log('\x1b[33m%s\x1b[0m', 'OAUTH profile: ', profile);
    db.FBUser.findOrCreate({where: {username: profile.displayName}})
             .spread((user, created) => {
               user.accessToken = accessToken;
               cb(null, user);
             });
  }
));

// Session stores the username.
exports.createSession = (req, res, username) => {
  return req.session.regenerate(() => {
    req.session.user = username;
    res.redirect('/');
  });
};

exports.fbPassport = fbPassport;
