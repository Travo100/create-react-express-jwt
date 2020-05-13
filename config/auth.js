const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  logUserIn: function (email, password) {
    return new Promise((resolve, reject) => {
      db.User.findOne({
        email: email,
      })
        .then((user) => {
          user.verifyPassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.SERVER_SECRET,
                { expiresIn: 129600 }
              ); // Sigining the token
              resolve({
                success: true,
                message: "Token Issued!",
                token: token,
                user: user,
              });
            } else {
              reject({
                success: false,
                message: "Authentication failed. Wrong password.",
              });
            }
          });
        })
        .catch((err) =>
          reject({ success: false, message: "User not found", error: err })
        );
    });
  },
};
