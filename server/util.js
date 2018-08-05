const db = require('../database/index.js');
const fbPassport = require('passport');
const FacebookStrategy = require('passport-facebook');
const { clientID, clientSecret, callbackURL, profileFields} = require('./server.config.js').fbConfig;

fbPassport.use(new FacebookStrategy(
  {clientID, clientSecret, callbackURL, profileFields},
  (accessToken, refreshToken, profile, cb) => {
    db.FBUser
      .findOrCreate({
        where: {username: profile.displayName},
        defaults: convertToSQLData(profile._json)
      })
      .spread((sequelizedUser, created) => {
        // this user data will be stored into session.
        const sessionUser = convertToSessionUser(sequelizedUser, accessToken, profile.id);
        cb(null, sessionUser);
      });
  }
));

/**
 * Convert raw json data into our SQL table acceptable format.
 * @param {object} rawData - profile._json which is sent back from facebook after oauth authentication.
 */
const convertToSQLData = (rawData) => {
  rawData.picture = `http://graph.facebook.com/${rawData.id}/picture?height=128&width=128`;
  rawData.hometown = rawData.hometown ? rawData.hometown.name : '';
  rawData.location = rawData.location ? rawData.location.name : '';
  rawData.age = rawData.age_range ? rawData.age_range.min : '';

  delete rawData.id;
  delete rawData.age_range;
  console.log('**************ED:')
  console.log(rawData);
  return rawData;
};

/**
 * Convert seqeulize object model User into a plain user object that will be stored into db.
 * @param {object} sequelizedUser - a seqeulize object model User.
 * @param {string} accessToken - accessToken sent from facebook Oauth.
 */
const convertToSessionUser = (sequelizedUser, accessToken, fbId) => {
  const user = sequelizedUser.get({plain: true});
  user.accessToken = accessToken;
  user.fbId = fbId;
  return user;
}

// Session stores the username. DEPRECATED.
exports.createSession = (req, res, username) => {
  return req.session.regenerate(() => {
    req.session.user = username;
    res.redirect('/');
  });
};

exports.fbPassport = fbPassport;



// rrnmecijtq_1533402978@tfbnw.net 
// ROOMEEHR32