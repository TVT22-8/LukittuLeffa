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

    const dummyData = {
      userId: 123,
      username: 'john_doe',
      role: 'user',
    };

    res.json({ authenticated: false, user: dummyData });

  } catch (error) {
    console.error('Error during authentication:', error.message);
    res.json({ authenticated: false, error: 'Server error during authentication' });
  }
});

async function checkPassword(inputPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match; // Returns true if passwords match, false otherwise
  } catch (error) {
    console.error('Error checking password:', error);
    throw new Error('Error checking password');
  }
};

module.exports = app;
