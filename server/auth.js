const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validateLogin, createUser } = require("../database/databaseRoutes");

passport.use(
  "local-login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await validateLogin(username, password);
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      return done(null, user);
    } catch (err) {
      throw err;
    }
  })
);

passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const { firstname, lastname, zipCode, gender, age, photo } = req.body;
      const newUser = {
        username,
        password,
        firstname,
        lastname,
        email: username,
        zipCode,
        gender,
        age,
        photo,
      };
      const createdUser = await createUser(newUser);
      if (createdUser) {
        return done(null, createdUser);
      }
      return done(null, false, { message: "username already existed" })
    }
  )
);

module.exports = passport;
