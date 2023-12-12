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
    console.log('credentials: ', username, password);

    const user = await userController.getUserByUsername(username);

    if (!user || !user.length) {
      // User not found
      console.log('User not found');
      res.json({ authenticated: false, error: 'User not found' });
      return;
    }

    const hashedPassword = user[0].pwd;
    console.log(hashedPassword);

    const match = bcrypt.compare(password,hashedPassword);
    console.log(match);

  } catch (error) {
    console.error('Error during authentication:', error.message);
    res.json({ authenticated: false, error: 'Server error during authentication' });
  }
});



module.exports = app;
