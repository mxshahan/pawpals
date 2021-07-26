const checkAuthentication = require('../config/isAuthenticated');
const passport = require('../config/passport');
const router = require('express').Router();

// called from AuthContext component
router.get('/isAuthenticated', checkAuthentication, function(req, res) {
  console.log('in authRoutes. isAuthenticated successful')
  // console.log('req.user: ',req.user);
  // console.log('.req.session.passport: ', req.session.passport);

  // only comes here if checkAuth = true
  res.send(true);
});

// called from AuthContext component; for when user reloads page while logged in
router.get('/getSession', checkAuthentication, function(req, res) {
  // console.log("in getsession");
  // console.log(req.user);
  res.send(req.user);
})

// order of events:
// 1. click btn on loginSignUp.jsx
// 2. api comes here
// 3. inside this router.post func
// 4. passport.js strategy
// 5. return here
router.post('/login', function(req, res, next) {
  // step #3 is here
  // console.log('----------------------');
  // console.log('req.session: ',req.session);
  // console.log('req.body: ', req.body);  // username and pass


  passport.authenticate('local-login', function(err, user, info) {
    // step #5 is here; come here no matter what
    console.log("err: ",err);
    console.log("user: ", user);
    console.log("info: ", info);

    // db error
    if (err) { 
      return next(err); 
    }

    // no user: invalid or non-registered username/pass
    // info is the error message
    if (!user) {
      return res.json(info); 
    }
    
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }

      // successful login in, updating context
      info.user = user;
      info.user.password = null;

      //returning success msg
      return res.json(info);
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  // console.log("logging out");
  req.logout();
  res.redirect('/');
})

module.exports = router;


// other methods attached to req:
// req.login()
// req.logout()
// req.isAuthenticated()
// req.isUnAuthenticated()