// This is middleware to check if a user is logged in or not
// returns next function if logged in, rtns false if not

module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.session.passport && req.session.passport.user) {
    return next();
  }

  // to-do: remove this if just using t/f
  // If the user isn't logged in, redirect them to the login page
  // return res.redirect('/');
  return res.send(false);
};
