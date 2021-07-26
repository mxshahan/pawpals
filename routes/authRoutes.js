const checkAuthentication = require('../config/isAuthenticated');
const passport = require('../config/passport');
const router = require('express').Router();

// called from AuthContext component
router.get('/isAuthenticated', checkAuthentication, function(req, res) {
  // only comes here if checkAuth = true
  res.send(true);
});

// called from AuthContext component; for when user reloads page while logged in
router.get('/getSession', checkAuthentication, function(req, res) {
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

  passport.authenticate('local-login', function(err, user, info) {
    // step #5 is here; come here no matter what
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

router.post('/signup', function(req, res, next) {
  // console.log('req.body: ', req.body);  // username and pass

  passport.authenticate('local-signup', function(err, user, info) {
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

      info.user = user;
      //returning success msg with user data
      return res.json(info);
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send(true);
});

module.exports = router;



// other methods attached to req:
// req.login()
// req.logout()
// req.isAuthenticated()
// req.isUnAuthenticated();
