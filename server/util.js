// Session stores the whole User object.
exports.createSession = (req, res, newUser) => {
  return req.session.regenerate(() => {
    req.session.user = newUser;
    res.redirect('/');
  });
};