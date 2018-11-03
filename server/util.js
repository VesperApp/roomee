// Session stores the username. DEPRECATED.
exports.createSession = (req, res, username) => {
  return req.session.regenerate(() => {
    req.session.user = username;
    res.redirect('/');
  });
};

exports.checkLogin = (req, res, next) => {
  console.log('******** ', req.user);
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};
