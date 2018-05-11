const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const PORT = process.env.PORT || 3001;
const app = express();

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: 'all sorts of code up in here'
});

// MOCKING DB just for test
let users = [
  {
    id: 1,
    username: 'test',
    password: 'asdf123'
  },
  {
    id: 2,
    username: 'test2',
    password: 'asdf12345'
  }
];

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  for (let user of users) { // I am using a simple array users which i made above
    if (username == user.username && password == user.password /* Use your password hash checking logic here !*/) {
      //If all credentials are correct do this
      let token = jwt.sign({ id: user.id, username: user.username }, 'all sorts of code up in here', { expiresIn: 129600 }); // Sigining the token
      return res.json({
        sucess: true,
        err: null,
        token
      });
      break;
    }
    else {
      res.status(401).json({
        sucess: false,
        token: null,
        err: 'Username or password is incorrect'
      });
      break;
    }
  }
});

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
