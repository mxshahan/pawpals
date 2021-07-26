// This is middleware to check if a user is logged in or not
// returns next function if logged in, rtns false if not

module.exports = function(req, res, next) {
  console.log('in isAuthenticated');
  // console.log(".coming from: ", req.url);
  // console.log('.req.user: ', req.user);
  console.log('.req.session.passport: ', req.session.passport);

  // If the user is logged in, continue with the request to the restricted route
  if (req.session.passport && req.session.passport.user) {
    console.log(".is authenticated");
    return next();
  }

  console.log(".isn't authenticated");

  // to-do: remove this if just using t/f
  // If the user isn't logged in, redirect them to the login page
  // return res.redirect('/');
  return res.send(false);
};
