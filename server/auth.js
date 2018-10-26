const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validateLogin } = require('../database/databaseRoutes');

passport.use(new LocalStrategy( async (username, password, done) => {
  try {
    const user = await validateLogin(username, password);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
  } catch(err) {
    throw(err);
  }
}));

module.exports = passport;
