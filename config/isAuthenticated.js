const exjwt = require("express-jwt");

// Init the express-jwt middleware
const isAuthenticated = exjwt({
  secret: process.env.SERVER_SECRET,
});

module.exports = isAuthenticated;
