const  db = require('../controllers/postgresPool');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { authQ } = require('../controllers/queries.js');


// messages
const invalidUsername = 'The username is incorrect or not registered.';
const invalidPass = 'The password is incorrect.';
const successSignUp = 'Login successful';

function validPassword(pass1, pass2) {
  if(pass1.localeCompare(pass2) === 0) 
    return true;
  return false;
}

// step #4 is here
passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    console.log(`in passport. username: ${username}. password ${password}`);

    db.query(authQ.login, [username], (error, user) => {
      if(user != undefined) console.log("user.rows: ",user.rows);

      // db error
      if(error) {
        return done(error);
      };

      // user error - username
      if(user.rowCount === 0) {
        return done(null, false, { statuscode: 401, message: invalidUsername})
      }

      if (!validPassword(password, user.rows[0].password)) {
        return done(null, false, { statuscode: 401, message: invalidPass });
      }

      // success
      return done(null, user.rows[0], { statuscode: 200, message: successSignUp });
    })
    
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));

// In order to help keep authentication state across HTTP requests,
// Just consider this part boilerplate needed to make it all work
// accesses the user obj, determines what data should be stored in session
// the result is attached to the session as req.session.passport.user = {serialised obj}
// result also attached to req.user
passport.serializeUser(function(user, cb) {
  console.log("in serialize ", user);
  cb(null, user);
});

// invoked every req by passport.session; enables loading additional user info
// on every req
passport.deserializeUser(function(obj, cb) {
  // console.log("in deserialize, ", obj);
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;