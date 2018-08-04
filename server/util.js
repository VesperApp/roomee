const db = require('../database/index.js');
const fbPassport = require('passport');
const FacebookStrategy = require('passport-facebook');
const { clientID, clientSecret, callbackURL, profileFields} = require('./server.config.js').fbConfig;

fbPassport.use(new FacebookStrategy(
  {clientID, clientSecret, callbackURL, profileFields},
  (accessToken, refreshToken, profile, cb) => {
    console.log('\x1b[33m%s\x1b[0m', 'OAUTH profile: ', profile);
    console.log(profile._json.picture.data);
    db.FBUser
      .findOrCreate({
        where: {username: profile.displayName},
        defaults: convertToSQLData(profile._json)
      })
      .spread((user, created) => {
        cb(null, user);
      });
  }
));

/**
 * Convert raw json data in to our SQL table acceptable format.
 * @param {object} rawData - profile._json which is sent back from facebook after oauth authentication.
 */
const convertToSQLData = (rawData) => {
  rawData.picture = `http://graph.facebook.com/${rawData.id}/picture?height=128&width=128`;
  rawData.hometown = rawData.hometown ? rawData.hometown.name : '';
  rawData.location = rawData.location ? rawData.location.name : '';
  rawData.age = rawData.age_range.min;
  delete rawData.id;
  return rawData;
};

// Session stores the username.
exports.createSession = (req, res, username) => {
  return req.session.regenerate(() => {
    req.session.user = username;
    res.redirect('/');
  });
};

exports.fbPassport = fbPassport;
