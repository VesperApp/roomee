const fbPassport = require('passport-facebook');

// For the convinience of development, I'm just gonna leave clientID and clientSecret here.
// So our team members don't have to create new ones.
fbPassport.use(new FacebookStrategy({
  clientID: 2211856122434963,
  clientSecret: 'ef25c8bf4c78c71e7e6fd5061dc41960',
  callbackURL: "http://localhost:4000/login/facebook/return"
},
  function (accessToken, refreshToken, profile, cb) {
    console.log('\x1b[33m%s\x1b[0m', 'OAUTH profile: ', profile);
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
