const bcrypt = require('bcrypt');
const express = require('express');
const userController = require('../controllers/userController');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/verifylogin', async (req, res) => {
  try {
    console.log('Received request at /verifylogin');

    const{username, password} = req.body.credentials;

    const user = await userController.getUserByUsername(username);

    if (!user || !user.length) {
      // User not found
      console.log('User not found');
      res.json({ authenticated: false, error: 'User not found' });
      return;
    }

    const hashedPassword = user[0].pwd;
    console.log(hashedPassword);

        setTimeout(() => {
      bcrypt.compare(password, hashedPassword)
        .then((match) => {
          console.log(match);
          if (match) {
            // Passwords match - User authenticated
            res.json({ authenticated: true, message: 'User authenticated', user: user });
          } else {
            // Passwords don't match
            res.json({ authenticated: false, error: 'Invalid password' });
          }
        })
        .catch((compareError) => {
          console.error('Error during password comparison:', compareError.message);
          res.json({ authenticated: false, error: 'Error during password comparison' });
        });
    }, 1000);

  } catch (error) {
    console.error('Error during authentication:', error.message);
    res.json({ authenticated: false, error: 'Server error during authentication' });
  }
});



module.exports = app;
