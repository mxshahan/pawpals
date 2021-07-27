const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cors = require("cors");
const path = require("path");
const passport = require('./config/passport');
const port = process.env.PORT || 3001;
const routes = require("./routes");
// const results = require('dotenv').config();  // to-do: using? else npm uninstall
var session = require('express-session');

// if(results.error) console.log(results.error)
// else console.log(results.parsed);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to-do: might need this uncommented for heroku; also in animalsController.js
// if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config();
// };

// app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


// We need to use sessions to keep track of our user's login status
app.use(session({ 
  secret: process.env.SESSION_KEY, 
  cookie: {},
  resave: false, 
  saveUninitialized: false 
}));
// initialize invoked every req; ensures session contains passport.user obj
app.use(passport.initialize());
// loads user obj into req.user if serialized user obj found
app.use(passport.session());


// api routes before all else
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });  
}
else {
  app.use(express.static('public'));
}


// if (app.get("env") === "production") {
//   // Serve secure cookies, requires HTTPS
//   session.cookie.secure = true;
// }

// start server
app.listen(port, function() {
  console.log("Server listening on port ", port);
});