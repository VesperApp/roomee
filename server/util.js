const db = require('../database/index.js');
const fbPassport = require('passport');
const FacebookStrategy = require('passport-facebook');
const {clientID, clientSecret, callbackURL} = require('./server.config.js').fbConfig;
// For the convinience of development, I'm just gonna leave clientID and clientSecret here.
// So our team members don't have to create new ones.
fbPassport.use(new FacebookStrategy(
  {clientID, clientSecret, callbackURL},
  (accessToken, refreshToken, profile, cb) => {
    console.log('\x1b[33m%s\x1b[0m', 'OAUTH profile: ', profile);
    db.User.findOrCreate({where: {username: profile.displayName},
        defaults: {password: profile.id}
      }
    ).spread((user, created) => cb(null, user));
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
